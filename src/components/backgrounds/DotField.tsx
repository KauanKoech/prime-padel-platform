/*
 * DotField: adaptado do kokonutui — Dot Field (https://kokonutui.com, @dorianbaffier, licença MIT).
 * Um meio-tom de pontos que respira devagar; o mouse deixa um rastro na "membrana" e um clique solta uma onda.
 * Mudanças: vira uma camada decorativa (canvas dentro da seção; os eventos vêm da seção), sem Tailwind nem
 * `cn`, sem conteúdo padrão; cor vinda do CSS (`color` do canvas), sem o relógio de troca de tema; DPR até 1,5;
 * interação só com mouse; parado (um quadro) com movimento reduzido. Para não pesar: cada tamanho de ponto vira
 * um sprite pré-desenhado, a física e o redesenho completo ficam só na região mexida, e no resto só os pontos
 * que mudaram de tamanho são redesenhados.
 */
import { useEffect, useRef } from 'react';

const NOISE_SCALE = 240;
const NOISE_SPEED = 0.07;
const TONE_STEP = 3;
const IDLE_FRAME_MS = 50;
const ANCHOR = 26;
const COUPLING = 340;
const DAMPING = 3.4;
const STEP = 1 / 120;
const MAX_STEPS = 4;
/** Se, mexendo, a média de quadro passar disso, o canvas cai para 1x (PCs fracos com escala de tela). */
const SLOW_FRAME_MS = 24;
const SLOW_SAMPLE = 60;
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
const REST_SPEED = 10;
const REST_OFFSET = 0.5;
/** Lado do bloco (em pontos) usado para saber onde a membrana se mexe. */
const TILE = 4;

type Shock = { x: number; y: number; age: number };
type Pointer = { x: number; y: number; lastX: number; lastY: number; inside: boolean };
/** Retângulo de células (inclusivo). */
type Box = { i0: number; i1: number; j0: number; j1: number };
type Sprite = { image: HTMLCanvasElement; half: number };
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
  /** Tamanho desenhado em repouso em cada célula (-1 = precisa redesenhar). */
  drawn: Int8Array;
  tilesX: number;
  /** Blocos com pontos em movimento; os calculados no último passo (vivos + vizinhos); os desenhados no quadro anterior. */
  live: Uint8Array;
  work: Uint8Array;
  shown: Uint8Array;
  paint: Uint8Array;
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
  const tilesX = Math.ceil(cols / TILE);
  const tiles = tilesX * Math.ceil(rows / TILE);
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
    drawn: new Int8Array(size).fill(-1),
    tilesX,
    live: new Uint8Array(tiles),
    work: new Uint8Array(tiles),
    shown: new Uint8Array(tiles),
    paint: new Uint8Array(tiles),
  };
}

/** As células de um bloco. */
function tileBox(field: Field, t: number): Box {
  const ti = t % field.tilesX;
  const tj = (t - ti) / field.tilesX;
  return { i0: ti * TILE, i1: Math.min(field.cols - 1, ti * TILE + TILE - 1), j0: tj * TILE, j1: Math.min(field.rows - 1, tj * TILE + TILE - 1) };
}

/** Marca os blocos que cobrem `box`. */
function markBox(field: Field, flags: Uint8Array, box: Box) {
  for (let tj = Math.floor(box.j0 / TILE); tj <= Math.floor(box.j1 / TILE); tj++) {
    for (let ti = Math.floor(box.i0 / TILE); ti <= Math.floor(box.i1 / TILE); ti++) flags[tj * field.tilesX + ti] = 1;
  }
}

/** `dst` = blocos de `src` mais os vizinhos (a onda anda no máximo uma célula por passo, então não pula um bloco). */
function dilate(field: Field, src: Uint8Array, dst: Uint8Array) {
  const { tilesX } = field;
  const tilesY = src.length / tilesX;
  dst.fill(0);
  for (let t = 0; t < src.length; t++) {
    if (!src[t]) continue;
    const ti = t % tilesX;
    const tj = (t - ti) / tilesX;
    for (let y = Math.max(0, tj - 1); y <= Math.min(tilesY - 1, tj + 1); y++) {
      for (let x = Math.max(0, ti - 1); x <= Math.min(tilesX - 1, ti + 1); x++) dst[y * tilesX + x] = 1;
    }
  }
}

function clampBox(field: Field, i0: number, i1: number, j0: number, j1: number): Box {
  return { i0: Math.max(0, i0), i1: Math.min(field.cols - 1, i1), j0: Math.max(0, j0), j1: Math.min(field.rows - 1, j1) };
}

/** As células ao alcance de um ponto (x, y) do canvas. */
function around(field: Field, x: number, y: number, reach: number): Box {
  const { spacing, originX, originY } = field;
  return clampBox(
    field,
    Math.floor((x - reach - originX) / spacing),
    Math.ceil((x + reach - originX) / spacing),
    Math.floor((y - reach - originY) / spacing),
    Math.ceil((y + reach - originY) / spacing),
  );
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

function accelerate(field: Field, box: Box) {
  const { cols, rows, ox, oy, vx, vy, ax, ay } = field;
  for (let j = box.j0; j <= box.j1; j++) {
    for (let i = box.i0; i <= box.i1; i++) {
      const k = j * cols + i;
      let nx = 0;
      let ny = 0;
      if (i > 0) {
        nx += ox[k - 1];
        ny += oy[k - 1];
      }
      if (i < cols - 1) {
        nx += ox[k + 1];
        ny += oy[k + 1];
      }
      if (j > 0) {
        nx += ox[k - cols];
        ny += oy[k - cols];
      }
      if (j < rows - 1) {
        nx += ox[k + cols];
        ny += oy[k + cols];
      }
      ax[k] += -ANCHOR * ox[k] + COUPLING * (nx - 4 * ox[k]) - DAMPING * vx[k];
      ay[k] += -ANCHOR * oy[k] + COUPLING * (ny - 4 * oy[k]) - DAMPING * vy[k];
    }
  }
}

function applyShocks(field: Field, shocks: Shock[]) {
  const { cols, spacing, originX, originY, ax, ay } = field;
  for (const shock of shocks) {
    const reach = shock.age * SHOCK_SPEED;
    const fade = 1 - shock.age / SHOCK_LIFE;
    const force = SHOCK_FORCE * fade * fade;
    const outer = reach + SHOCK_WIDTH;
    const inner = Math.max(0, reach - SHOCK_WIDTH);
    const box = around(field, shock.x, shock.y, outer);
    for (let j = box.j0; j <= box.j1; j++) {
      const dy = originY + j * spacing - shock.y;
      for (let i = box.i0; i <= box.i1; i++) {
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

/** Arrasta a membrana ao longo do segmento que o mouse percorreu; devolve as células mexidas. */
function applyPointer(field: Field, pointer: Pointer, dt: number): Box | null {
  const segX = pointer.x - pointer.lastX;
  const segY = pointer.y - pointer.lastY;
  pointer.lastX = pointer.x;
  pointer.lastY = pointer.y;
  const length = Math.hypot(segX, segY);
  if (!pointer.inside || length < 0.5 || dt <= 0) return null;
  const speed = Math.min(length / dt, POINTER_MAX_SPEED);
  const pvx = (segX / length) * speed;
  const pvy = (segY / length) * speed;
  const { cols, spacing, originX, originY, vx, vy } = field;
  const startX = pointer.x - segX;
  const startY = pointer.y - segY;
  const a = around(field, startX, startY, POINTER_RADIUS);
  const b = around(field, pointer.x, pointer.y, POINTER_RADIUS);
  const box = { i0: Math.min(a.i0, b.i0), i1: Math.max(a.i1, b.i1), j0: Math.min(a.j0, b.j0), j1: Math.max(a.j1, b.j1) };
  const lengthSq = length * length;
  const gain = Math.min(1, POINTER_GAIN * dt);
  for (let j = box.j0; j <= box.j1; j++) {
    const py = originY + j * spacing;
    for (let i = box.i0; i <= box.i1; i++) {
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
  return box;
}

/** Um passo só nos blocos vivos e vizinhos; devolve se ainda há algo se mexendo. */
function integrate(field: Field, shocks: Shock[], h: number): boolean {
  const { cols, ox, oy, vx, vy, ax, ay, live, work } = field;
  for (const s of shocks) markBox(field, live, around(field, s.x, s.y, s.age * SHOCK_SPEED + SHOCK_WIDTH));
  dilate(field, live, work);
  live.fill(0);
  for (let t = 0; t < work.length; t++) {
    if (!work[t]) continue;
    const box = tileBox(field, t);
    for (let j = box.j0; j <= box.j1; j++) {
      ax.fill(0, j * cols + box.i0, j * cols + box.i1 + 1);
      ay.fill(0, j * cols + box.i0, j * cols + box.i1 + 1);
    }
  }
  applyShocks(field, shocks);
  for (let t = 0; t < work.length; t++) if (work[t]) accelerate(field, tileBox(field, t));
  let moving = false;
  for (let t = 0; t < work.length; t++) {
    if (!work[t]) continue;
    const box = tileBox(field, t);
    for (let j = box.j0; j <= box.j1; j++) {
      for (let i = box.i0; i <= box.i1; i++) {
        const k = j * cols + i;
        vx[k] += ax[k] * h;
        vy[k] += ay[k] * h;
        ox[k] += vx[k] * h;
        oy[k] += vy[k] * h;
        if (!live[t] && (Math.abs(vx[k]) > REST_SPEED || Math.abs(vy[k]) > REST_SPEED || Math.abs(ox[k]) > REST_OFFSET || Math.abs(oy[k]) > REST_OFFSET)) {
          live[t] = 1;
          moving = true;
        }
      }
    }
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

function bucketOf(amount: number) {
  return Math.round(Math.min(1, Math.max(0, amount)) * (BUCKETS - 1));
}

/** Um sprite por tamanho (com a opacidade embutida): carimbar é bem mais barato que rasterizar milhares de arcos. */
function makeSprites(spacing: number, dpr: number, color: string): (Sprite | null)[] {
  const maxRadius = spacing * 0.42;
  return Array.from({ length: BUCKETS }, (_, b) => {
    if (b === 0) return null;
    const radius = (maxRadius * b) / (BUCKETS - 1);
    const px = Math.ceil((radius * 2 + 2) * dpr);
    const image = document.createElement('canvas');
    image.width = px;
    image.height = px;
    const c = image.getContext('2d');
    if (c) {
      c.fillStyle = color;
      c.globalAlpha = 0.2 + (0.32 * b) / (BUCKETS - 1);
      c.beginPath();
      c.arc(px / 2, px / 2, radius * dpr, 0, Math.PI * 2);
      c.fill();
    }
    return { image, half: px / dpr / 2 };
  });
}

/**
 * Redesenha por inteiro os blocos marcados (com deslocamento e compressão). Sem recorte: a borda do conjunto é
 * sempre um anel de blocos em repouso (vizinhos dos vivos), então nenhum ponto deslocado vaza para fora dele.
 */
function drawTiles(ctx: CanvasRenderingContext2D, field: Field, sprites: (Sprite | null)[], dpr: number, flags: Uint8Array) {
  const { cols, spacing, originX, originY, tone, ox, oy, drawn } = field;
  for (let t = 0; t < flags.length; t++) {
    if (!flags[t]) continue;
    const box = tileBox(field, t);
    const x0 = originX + (box.i0 - 0.5) * spacing;
    const y0 = originY + (box.j0 - 0.5) * spacing;
    const w = (box.i1 - box.i0 + 1) * spacing;
    const h = (box.j1 - box.j0 + 1) * spacing;
    ctx.clearRect(x0, y0, w, h);
  }
  for (let t = 0; t < flags.length; t++) {
    if (!flags[t]) continue;
    const box = tileBox(field, t);
    for (let j = box.j0; j <= box.j1; j++) {
      for (let i = box.i0; i <= box.i1; i++) {
        const k = j * cols + i;
        drawn[k] = -1;
        const sprite = sprites[bucketOf((0.12 + 0.6 * tone[k]) * (1 + COMPRESSION_GAIN * compression(field, i, j)))];
        if (!sprite) continue;
        // em pixel inteiro do aparelho: carimbo direto, sem reamostrar
        const x = Math.round((originX + i * spacing + ox[k] - sprite.half) * dpr) / dpr;
        const y = Math.round((originY + j * spacing + oy[k] - sprite.half) * dpr) / dpr;
        ctx.drawImage(sprite.image, x, y, sprite.half * 2, sprite.half * 2);
      }
    }
  }
}

/** Fora dos blocos mexidos, só os pontos que mudaram de tamanho: limpa a célula e carimba de novo. */
function drawChanged(ctx: CanvasRenderingContext2D, field: Field, sprites: (Sprite | null)[], dpr: number, skip: Uint8Array | null) {
  const { cols, rows, spacing, originX, originY, tone, drawn, tilesX } = field;
  const halfCell = spacing / 2;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (skip && skip[Math.floor(j / TILE) * tilesX + Math.floor(i / TILE)]) continue;
      const k = j * cols + i;
      const bucket = bucketOf(0.12 + 0.6 * tone[k]);
      if (drawn[k] === bucket) continue;
      drawn[k] = bucket;
      const x = originX + i * spacing;
      const y = originY + j * spacing;
      ctx.clearRect(x - halfCell, y - halfCell, spacing, spacing);
      const sprite = sprites[bucket];
      if (sprite) ctx.drawImage(sprite.image, Math.round((x - sprite.half) * dpr) / dpr, Math.round((y - sprite.half) * dpr) / dpr, sprite.half * 2, sprite.half * 2);
    }
  }
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
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lowRes = false;
    let slowSum = 0;
    let slowCount = 0;
    let field = createField(0, 0, gap);
    let sprites: (Sprite | null)[] = [];
    const pointer: Pointer = { x: 0, y: 0, lastX: 0, lastY: 0, inside: false };
    const shocks: Shock[] = [];
    let stirring = false;
    let time = 0;
    let last = 0;
    let lastTone = 0;
    let carry = 0;
    let awake = false;
    let raf = 0;
    let visible = true;
    let rect: DOMRect | null = null;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      dpr = lowRes ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = box.width;
      height = box.height;
      rect = null;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sprites = makeSprites(gap, dpr, getComputedStyle(canvas).color);
      field = createField(width, height, gap);
      shocks.length = 0;
      awake = false;
      sampleTone(field, noise, time);
      ctx.clearRect(0, 0, width, height);
      drawChanged(ctx, field, sprites, dpr, null);
    };

    const physics = (dt: number) => {
      const touched = applyPointer(field, pointer, dt);
      if (touched) markBox(field, field.live, touched);
      carry = Math.min(carry + dt, STEP * MAX_STEPS);
      while (carry >= STEP) {
        carry -= STEP;
        for (const s of shocks) s.age += STEP;
        while (shocks.length > 0 && shocks[0].age > SHOCK_LIFE) shocks.shift();
        stirring = integrate(field, shocks, STEP);
      }
      if (!(touched || stirring || shocks.length > 0)) {
        field.ox.fill(0);
        field.oy.fill(0);
        field.vx.fill(0);
        field.vy.fill(0);
        field.live.fill(0);
        field.work.fill(0);
        awake = false;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      if (awake) {
        physics(dt);
        if (!lowRes && dpr > 1 && dt > 0) {
          slowSum += dt * 1000;
          if (++slowCount === SLOW_SAMPLE) {
            if (slowSum / SLOW_SAMPLE > SLOW_FRAME_MS) {
              lowRes = true;
              resize();
            }
            slowSum = 0;
            slowCount = 0;
          }
        }
      }
      const toneDue = now - lastTone >= IDLE_FRAME_MS;
      if (toneDue) {
        sampleTone(field, noise, time);
        lastTone = now;
      }
      // blocos calculados agora + os do quadro anterior (para apagar o rastro de quem acabou de parar)
      const { work, shown, paint } = field;
      let painting = false;
      for (let t = 0; t < paint.length; t++) {
        paint[t] = work[t] | shown[t];
        if (paint[t]) painting = true;
      }
      if (painting) drawTiles(ctx, field, sprites, dpr, paint);
      shown.set(work);
      if (toneDue) drawChanged(ctx, field, sprites, dpr, painting ? paint : null);
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

    // a posição do canvas só muda com rolagem ou redimensionamento: mede uma vez e reaproveita
    const forget = () => {
      rect = null;
    };
    window.addEventListener('scroll', forget, { passive: true });
    const local = (e: PointerEvent) => {
      rect ??= canvas.getBoundingClientRect();
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
      window.removeEventListener('scroll', forget);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, [spacing, seed]);

  return <canvas ref={canvasRef} className={['bg-layer', className].filter(Boolean).join(' ')} aria-hidden="true" />;
}
