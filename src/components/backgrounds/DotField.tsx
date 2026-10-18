/*
 * DotField: adaptado do kokonutui — Dot Field (https://kokonutui.com, @dorianbaffier, licença MIT).
 * Um meio-tom de pontos que respira devagar; o mouse deixa um rastro na "membrana" e um clique solta uma onda.
 * Mudanças: vira uma camada decorativa (canvas dentro da seção; os eventos vêm da seção), sem Tailwind nem
 * `cn`, sem conteúdo padrão; cor vinda do CSS (`color` do canvas), sem o relógio de troca de tema; DPR até 1,5;
 * interação só com mouse; parado (um quadro) com movimento reduzido.
 */
import { useEffect, useRef } from 'react';

const NOISE_SCALE = 240;
const NOISE_SPEED = 0.07;
const TONE_STEP = 3;
const IDLE_FRAME_MS = 33;
const ANCHOR = 26;
const COUPLING = 340;
const DAMPING = 2.4;
const STEP = 1 / 120;
const POINTER_RADIUS = 72;
const POINTER_GAIN = 14;
const POINTER_MAX_SPEED = 2600;
const POINTER_PART = 0.45;
const SHOCK_SPEED = 620;
const SHOCK_WIDTH = 34;
const SHOCK_FORCE = 5200;
const SHOCK_LIFE = 1.3;
const COMPRESSION_GAIN = 3;
const BUCKETS = 10;
const REST_SPEED = 2;
const REST_OFFSET = 0.15;

type Shock = { x: number; y: number; age: number };
type Pointer = { x: number; y: number; lastX: number; lastY: number; inside: boolean };
type Field = {
  cols: number;
  rows: number;
  spacing: number;
  originX: number;
  originY: number;
  tone: Float32Array;
  coarse: Float32Array;
  ox: Float32Array;
  oy: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  ax: Float32Array;
  ay: Float32Array;
};

/** Ruído de gradiente 3D com semente (improved noise de Ken Perlin), de -1 a 1. */
function createNoise(seed: number) {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let state = seed >>> 0 || 1;
  const random = () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const fz = z - Math.floor(z);
    const u = fade(fx);
    const v = fade(fy);
    const w = fade(fz);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    return lerp(
      lerp(lerp(grad(perm[AA], fx, fy, fz), grad(perm[BA], fx - 1, fy, fz), u), lerp(grad(perm[AB], fx, fy - 1, fz), grad(perm[BB], fx - 1, fy - 1, fz), u), v),
      lerp(
        lerp(grad(perm[AA + 1], fx, fy, fz - 1), grad(perm[BA + 1], fx - 1, fy, fz - 1), u),
        lerp(grad(perm[AB + 1], fx, fy - 1, fz - 1), grad(perm[BB + 1], fx - 1, fy - 1, fz - 1), u),
        v,
      ),
      w,
    );
  };
}

function createField(width: number, height: number, spacing: number): Field {
  const cols = Math.ceil(width / spacing) + 3;
  const rows = Math.ceil(height / spacing) + 3;
  const size = cols * rows;
  return {
    cols,
    rows,
    spacing,
    originX: (width - (cols - 1) * spacing) / 2,
    originY: (height - (rows - 1) * spacing) / 2,
    tone: new Float32Array(size),
    coarse: new Float32Array((Math.ceil((cols - 1) / TONE_STEP) + 1) * (Math.ceil((rows - 1) / TONE_STEP) + 1)),
    ox: new Float32Array(size),
    oy: new Float32Array(size),
    vx: new Float32Array(size),
    vy: new Float32Array(size),
    ax: new Float32Array(size),
    ay: new Float32Array(size),
  };
}

/** O meio-tom parado: o ruído é amostrado a cada 3 pontos e interpolado no meio. */
function sampleTone(field: Field, noise: ReturnType<typeof createNoise>, time: number) {
  const { cols, rows, spacing, originX, originY, tone, coarse } = field;
  const z = time * NOISE_SPEED;
  const step = spacing * TONE_STEP;
  const cc = Math.ceil((cols - 1) / TONE_STEP) + 1;
  const cr = Math.ceil((rows - 1) / TONE_STEP) + 1;
  for (let j = 0; j < cr; j++) {
    const ny = (originY + j * step) / NOISE_SCALE;
    for (let i = 0; i < cc; i++) {
      const nx = (originX + i * step) / NOISE_SCALE;
      const n = noise(nx, ny, z) * 0.75 + noise(nx * 2.1 + 9.3, ny * 2.1 + 3.7, z * 1.3) * 0.25;
      coarse[j * cc + i] = Math.min(1, Math.max(0, 0.5 + n * 1.1));
    }
  }
  for (let j = 0; j < rows; j++) {
    const cj = Math.min(Math.floor(j / TONE_STEP), cr - 2);
    const fy = j / TONE_STEP - cj;
    for (let i = 0; i < cols; i++) {
      const ci = Math.min(Math.floor(i / TONE_STEP), cc - 2);
      const fx = i / TONE_STEP - ci;
      const a = cj * cc + ci;
      const top = coarse[a] + (coarse[a + 1] - coarse[a]) * fx;
      const bottom = coarse[a + cc] + (coarse[a + cc + 1] - coarse[a + cc]) * fx;
      tone[j * cols + i] = top + (bottom - top) * fy;
    }
  }
}

function neighbours(values: Float32Array, field: Field, i: number, j: number) {
  const { cols, rows } = field;
  const k = j * cols + i;
  let sum = 0;
  if (i > 0) sum += values[k - 1];
  if (i < cols - 1) sum += values[k + 1];
  if (j > 0) sum += values[k - cols];
  if (j < rows - 1) sum += values[k + cols];
  return sum;
}

function accelerate(field: Field) {
  const { cols, rows, ox, oy, vx, vy, ax, ay } = field;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      ax[k] += -ANCHOR * ox[k] + COUPLING * (neighbours(ox, field, i, j) - 4 * ox[k]) - DAMPING * vx[k];
      ay[k] += -ANCHOR * oy[k] + COUPLING * (neighbours(oy, field, i, j) - 4 * oy[k]) - DAMPING * vy[k];
    }
  }
}

function applyShocks(field: Field, shocks: Shock[]) {
  const { cols, rows, spacing, originX, originY, ax, ay } = field;
  for (const shock of shocks) {
    const reach = shock.age * SHOCK_SPEED;
    const fade = 1 - shock.age / SHOCK_LIFE;
    const force = SHOCK_FORCE * fade * fade;
    const outer = reach + SHOCK_WIDTH;
    const inner = Math.max(0, reach - SHOCK_WIDTH);
    const i0 = Math.max(0, Math.floor((shock.x - outer - originX) / spacing));
    const i1 = Math.min(cols - 1, Math.ceil((shock.x + outer - originX) / spacing));
    const j0 = Math.max(0, Math.floor((shock.y - outer - originY) / spacing));
    const j1 = Math.min(rows - 1, Math.ceil((shock.y + outer - originY) / spacing));
    for (let j = j0; j <= j1; j++) {
      const dy = originY + j * spacing - shock.y;
      for (let i = i0; i <= i1; i++) {
        const dx = originX + i * spacing - shock.x;
        const dist = Math.hypot(dx, dy);
        if (dist < inner || dist > outer || dist === 0) continue;
        const band = 1 - Math.abs(dist - reach) / SHOCK_WIDTH;
        const k = j * cols + i;
        ax[k] += (dx / dist) * force * band;
        ay[k] += (dy / dist) * force * band;
      }
    }
  }
}

function applyPointer(field: Field, pointer: Pointer, dt: number) {
  const segX = pointer.x - pointer.lastX;
  const segY = pointer.y - pointer.lastY;
  pointer.lastX = pointer.x;
  pointer.lastY = pointer.y;
  const length = Math.hypot(segX, segY);
  if (!pointer.inside || length < 0.5 || dt <= 0) return false;
  const speed = Math.min(length / dt, POINTER_MAX_SPEED);
  const pvx = (segX / length) * speed;
  const pvy = (segY / length) * speed;
  const { cols, rows, spacing, originX, originY, vx, vy } = field;
  const startX = pointer.x - segX;
  const startY = pointer.y - segY;
  const i0 = Math.max(0, Math.floor((Math.min(startX, pointer.x) - POINTER_RADIUS - originX) / spacing));
  const i1 = Math.min(cols - 1, Math.ceil((Math.max(startX, pointer.x) + POINTER_RADIUS - originX) / spacing));
  const j0 = Math.max(0, Math.floor((Math.min(startY, pointer.y) - POINTER_RADIUS - originY) / spacing));
  const j1 = Math.min(rows - 1, Math.ceil((Math.max(startY, pointer.y) + POINTER_RADIUS - originY) / spacing));
  const lengthSq = length * length;
  const gain = Math.min(1, POINTER_GAIN * dt);
  for (let j = j0; j <= j1; j++) {
    const py = originY + j * spacing;
    for (let i = i0; i <= i1; i++) {
      const px = originX + i * spacing;
      const t = Math.min(1, Math.max(0, ((px - startX) * segX + (py - startY) * segY) / lengthSq));
      const awayX = px - startX - segX * t;
      const awayY = py - startY - segY * t;
      const dist = Math.hypot(awayX, awayY);
      if (dist >= POINTER_RADIUS) continue;
      const falloff = 1 - dist / POINTER_RADIUS;
      const k = j * cols + i;
      const amount = gain * falloff * falloff;
      const side = dist > 0 ? (speed * POINTER_PART) / dist : 0;
      vx[k] += (pvx + awayX * side - vx[k]) * amount;
      vy[k] += (pvy + awayY * side - vy[k]) * amount;
    }
  }
  return true;
}

function integrate(field: Field, shocks: Shock[], h: number) {
  const { ox, oy, vx, vy, ax, ay } = field;
  ax.fill(0);
  ay.fill(0);
  applyShocks(field, shocks);
  accelerate(field);
  let moving = false;
  for (let k = 0; k < ox.length; k++) {
    vx[k] += ax[k] * h;
    vy[k] += ay[k] * h;
    ox[k] += vx[k] * h;
    oy[k] += vy[k] * h;
    if (!moving && (Math.abs(vx[k]) > REST_SPEED || Math.abs(vy[k]) > REST_SPEED || Math.abs(ox[k]) > REST_OFFSET || Math.abs(oy[k]) > REST_OFFSET)) moving = true;
  }
  return moving;
}

function compression(field: Field, i: number, j: number) {
  const { cols, rows, spacing, ox, oy } = field;
  const k = j * cols + i;
  const left = i > 0 ? ox[k - 1] : 0;
  const right = i < cols - 1 ? ox[k + 1] : 0;
  const up = j > 0 ? oy[k - cols] : 0;
  const down = j < rows - 1 ? oy[k + cols] : 0;
  return -(right - left + down - up) / (2 * spacing);
}

/** Desenha os pontos agrupados por tamanho: alguns preenchimentos em vez de milhares. */
function draw(ctx: CanvasRenderingContext2D, field: Field, size: { width: number; height: number; color: string }, moving: boolean) {
  const { cols, rows, spacing, originX, originY, tone, ox, oy } = field;
  const maxRadius = spacing * 0.42;
  const paths = Array.from({ length: BUCKETS }, () => new Path2D());
  const filled = new Uint8Array(BUCKETS);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      let amount = 0.12 + 0.6 * tone[k];
      if (moving) amount *= 1 + COMPRESSION_GAIN * compression(field, i, j);
      const bucket = Math.round(Math.min(1, Math.max(0, amount)) * (BUCKETS - 1));
      if (bucket === 0) continue;
      const radius = (maxRadius * bucket) / (BUCKETS - 1);
      const x = originX + i * spacing + ox[k];
      const y = originY + j * spacing + oy[k];
      paths[bucket].moveTo(x + radius, y);
      paths[bucket].arc(x, y, radius, 0, Math.PI * 2);
      filled[bucket] = 1;
    }
  }
  ctx.clearRect(0, 0, size.width, size.height);
  ctx.fillStyle = size.color;
  for (let b = 1; b < BUCKETS; b++) {
    if (!filled[b]) continue;
    ctx.globalAlpha = 0.2 + (0.32 * b) / (BUCKETS - 1);
    ctx.fill(paths[b]);
  }
  ctx.globalAlpha = 1;
}

/** Camada de pontos para o fundo de uma seção. A cor vem do CSS (`color` do canvas). */
export function DotField({ spacing = 16, seed = 7, className }: { spacing?: number; seed?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const noise = createNoise(seed);
    const gap = Math.max(6, spacing);
    const size = { width: 0, height: 0, color: '' };
    let field = createField(0, 0, gap);
    const pointer: Pointer = { x: 0, y: 0, lastX: 0, lastY: 0, inside: false };
    const shocks: Shock[] = [];
    let time = 0;
    let last = 0;
    let lastTone = 0;
    let carry = 0;
    let stirring = false;
    let awake = false;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      size.width = rect.width;
      size.height = rect.height;
      canvas.width = Math.max(1, Math.round(size.width * dpr));
      canvas.height = Math.max(1, Math.round(size.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.color = getComputedStyle(canvas).color;
      field = createField(size.width, size.height, gap);
      sampleTone(field, noise, time);
      awake = false;
      draw(ctx, field, size, false);
    };

    const physics = (dt: number) => {
      const pushed = applyPointer(field, pointer, dt);
      carry = Math.min(carry + dt, STEP * 6);
      while (carry >= STEP) {
        carry -= STEP;
        for (const s of shocks) s.age += STEP;
        while (shocks.length > 0 && shocks[0].age > SHOCK_LIFE) shocks.shift();
        stirring = integrate(field, shocks, STEP);
      }
      if (!(pushed || stirring || shocks.length > 0)) {
        field.ox.fill(0);
        field.oy.fill(0);
        field.vx.fill(0);
        field.vy.fill(0);
        awake = false;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      const wasAwake = awake;
      if (awake) physics(dt);
      const toneDue = now - lastTone >= IDLE_FRAME_MS;
      if (toneDue) {
        sampleTone(field, noise, time);
        lastTone = now;
      }
      if (wasAwake || toneDue) draw(ctx, field, size, wasAwake);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible && !reduce) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const wake = () => {
      if (!awake) {
        awake = true;
        carry = 0;
        stirring = true;
      }
      start();
    };

    resize();
    canvas.classList.add('is-ready');
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let onScreen = true;
    const updateVisible = () => {
      visible = onScreen && document.visibilityState === 'visible';
      if (visible) start();
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      updateVisible();
    });
    io.observe(host);
    document.addEventListener('visibilitychange', updateVisible);

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const p = local(e);
      if (!pointer.inside) {
        pointer.lastX = p.x;
        pointer.lastY = p.y;
        pointer.inside = true;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      if (Math.abs(pointer.x - pointer.lastX) > 0.5 || Math.abs(pointer.y - pointer.lastY) > 0.5) wake();
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onDown = (e: PointerEvent) => {
      // cliques no conteúdo (links, botões, quadras) não são para o fundo
      if (e.pointerType !== 'mouse' || e.button !== 0 || (e.target as Element).closest('a, button, input, textarea, select, label')) return;
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.lastX = p.x;
      pointer.lastY = p.y;
      pointer.inside = true;
      shocks.push({ ...p, age: 0 });
      if (shocks.length > 3) shocks.shift();
      wake();
    };
    if (fine && !reduce) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('pointerdown', onDown);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', updateVisible);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, [spacing, seed]);

  return <canvas ref={canvasRef} className={['bg-layer', className].filter(Boolean).join(' ')} aria-hidden="true" />;
}
