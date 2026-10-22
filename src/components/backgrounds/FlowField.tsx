/*
 * FlowField: adaptado do kokonutui — Flow Field / Wind (https://kokonutui.com, @dorianbaffier, licença MIT).
 * Linhas de vento que derivam devagar, sozinhas.
 * Mudanças: vira uma camada decorativa (canvas dentro da seção), sem Tailwind, `cn` nem conteúdo; cor vinda do
 * CSS (`color` do canvas), sem o relógio de troca de tema e sem o vigia de DPR; DPR até 1,5; densidade menor no
 * celular; pausa fora da tela e com a aba oculta; quadro parado (linhas de corrente) com movimento reduzido.
 * Sem a interação com o mouse (o disco que o ar contornava, os redemoinhos e a rajada do clique) e a ~30 quadros
 * por segundo, para não pesar. O vento e o desenho são os do original.
 */
import { useEffect, useRef } from 'react';

// Particles at density 1. Narrow screens get fewer.
const BASE_COUNT = 700;
// Wind speed in px/s at speed 1, and the size of its bends (px).
const WIND = 64;
const NOISE_SCALE = 340;
// How far the wind may turn from left-to-right, in radians.
const TURN = 1.15;
// How quickly a particle takes up the local wind (per second). Lower values
// give them more momentum.
const RESPONSE = 9;
// Trails fade with this time constant (seconds).
const TRAIL_TAU = 0.22;
// Four alpha levels: each is one stroked path, so a frame is four draw calls.
const BUCKETS = [0.18, 0.34, 0.54, 0.8] as const;
// Segments longer than this are a wrap or a push, not motion.
const MAX_SEGMENT = 40;
// The drift is slow; half the frame rate looks the same and costs half as much.
const FRAME_MS = 33;
// Destination-out can't fade the last few alpha levels in small steps, so
// while frames are short a stronger pass clears that residue once a second.
const CLEANUP_MS = 1000;
const CLEANUP_ALPHA = 0.24;
// The still frame used for reduced motion and speed 0.
const STILL_LINES = 340;
const STILL_STEPS = 18;
const STILL_DT = 0.05;

/** Seeded 3D gradient noise (Ken Perlin's improved noise), about -1 to 1. */
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
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    let v = z;
    if (h < 4) {
      v = y;
    } else if (h === 12 || h === 14) {
      v = x;
    }
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
      lerp(
        lerp(grad(perm[AA], fx, fy, fz), grad(perm[BA], fx - 1, fy, fz), u),
        lerp(
          grad(perm[AB], fx, fy - 1, fz),
          grad(perm[BB], fx - 1, fy - 1, fz),
          u
        ),
        v
      ),
      lerp(
        lerp(
          grad(perm[AA + 1], fx, fy, fz - 1),
          grad(perm[BA + 1], fx - 1, fy, fz - 1),
          u
        ),
        lerp(
          grad(perm[AB + 1], fx, fy - 1, fz - 1),
          grad(perm[BB + 1], fx - 1, fy - 1, fz - 1),
          u
        ),
        v
      ),
      w
    );
  };
}

type Noise = ReturnType<typeof createNoise>;

interface Air {
  noise: Noise;
  time: number;
  wind: number;
}

// Scratch vector the field functions write into, so a frame allocates
// nothing per particle.
const out = { x: 0, y: 0 };

/** The undisturbed wind: left to right, turned by slowly drifting noise. */
function baseWind(air: Air, x: number, y: number) {
  const t = air.time;
  const angle =
    air.noise((x - t * WIND * 0.6) / NOISE_SCALE, y / NOISE_SCALE, t * 0.06) *
    TURN;
  out.x = Math.cos(angle) * air.wind;
  out.y = Math.sin(angle) * air.wind;
}

/** Particle state as flat arrays: cheap to walk 700 times a frame. */
class Particles {
  count = 0;
  width = 0;
  height = 0;
  x = new Float32Array(0);
  y = new Float32Array(0);
  vx = new Float32Array(0);
  vy = new Float32Array(0);
  life = new Float32Array(0);
  maxLife = new Float32Array(0);
  pace = new Float32Array(0);

  resize(count: number, width: number, height: number) {
    if (count === this.count) {
      // Same count, new size: stretch the particles over the new area so a
      // wider canvas doesn't start with an empty strip.
      const sx = this.width > 0 ? width / this.width : 1;
      const sy = this.height > 0 ? height / this.height : 1;
      for (let i = 0; i < count; i++) {
        this.x[i] *= sx;
        this.y[i] *= sy;
      }
      this.width = width;
      this.height = height;
      return;
    }
    this.width = width;
    this.height = height;
    this.count = count;
    this.x = new Float32Array(count);
    this.y = new Float32Array(count);
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.life = new Float32Array(count);
    this.maxLife = new Float32Array(count);
    this.pace = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      this.spawn(i, width, height);
      // Start part way through their lives so they don't all fade together.
      this.life[i] = Math.random() * this.maxLife[i];
    }
  }

  spawn(i: number, width: number, height: number) {
    this.x[i] = Math.random() * width;
    this.y[i] = Math.random() * height;
    this.vx[i] = 0;
    this.vy[i] = 0;
    this.life[i] = 0;
    this.maxLife[i] = 3 + Math.random() * 5;
    this.pace[i] = 0.75 + Math.random() * 0.5;
  }
}

/** Fade in at birth and out before respawning, so nothing pops. */
function envelope(life: number, maxLife: number) {
  return Math.min(1, life / 0.6, (maxLife - life) / 0.6);
}

function bucketOf(intensity: number) {
  return Math.max(0, Math.min(BUCKETS.length - 1, Math.floor(intensity * 4)));
}

/** Wrap a particle that blew off one edge back in on the opposite one. */
function wrap(v: number, size: number) {
  if (v < -8) {
    return v + size + 16;
  }
  if (v > size + 8) {
    return v - size - 16;
  }
  return v;
}

interface StepContext {
  air: Air;
  particles: Particles;
  paths: Path2D[];
  width: number;
  height: number;
  dt: number;
}

function stepParticle(c: StepContext, i: number) {
  const { air, particles: p, dt } = c;
  p.life[i] += dt;
  if (p.life[i] > p.maxLife[i]) {
    p.spawn(i, c.width, c.height);
    return;
  }
  const x0 = p.x[i];
  const y0 = p.y[i];
  baseWind(air, x0, y0);
  const take = 1 - Math.exp(-RESPONSE * dt);
  p.vx[i] += (out.x * p.pace[i] - p.vx[i]) * take;
  p.vy[i] += (out.y * p.pace[i] - p.vy[i]) * take;
  p.x[i] = wrap(x0 + p.vx[i] * dt, c.width);
  p.y[i] = wrap(y0 + p.vy[i] * dt, c.height);

  const sx = p.x[i] - x0;
  const sy = p.y[i] - y0;
  if (sx * sx + sy * sy > MAX_SEGMENT * MAX_SEGMENT) {
    return;
  }
  // Faster air draws darker.
  const pace = Math.hypot(p.vx[i], p.vy[i]) / (air.wind * 2.4 + 1);
  const intensity = envelope(p.life[i], p.maxLife[i]) * Math.min(1, 0.4 + pace);
  const path = c.paths[bucketOf(intensity)];
  path.moveTo(x0, y0);
  path.lineTo(p.x[i], p.y[i]);
}

function strokeBuckets(ctx: CanvasRenderingContext2D, paths: Path2D[]) {
  for (let b = 0; b < BUCKETS.length; b++) {
    ctx.globalAlpha = BUCKETS[b];
    ctx.stroke(paths[b]);
  }
  ctx.globalAlpha = 1;
}

/** Streamlines traced from random seeds: a still picture of the wind. */
function drawStill(
  ctx: CanvasRenderingContext2D,
  air: Air,
  size: { width: number; height: number },
  lines: number
) {
  const paths = BUCKETS.map(() => new Path2D());
  for (let n = 0; n < lines; n++) {
    let x = Math.random() * size.width;
    let y = Math.random() * size.height;
    for (let s = 0; s < STILL_STEPS; s++) {
      baseWind(air, x, y);
      const nx = x + out.x * STILL_DT;
      const ny = y + out.y * STILL_DT;
      // Each line darkens towards its head, like a trail.
      const path = paths[bucketOf((s / STILL_STEPS) * 0.75)];
      path.moveTo(x, y);
      path.lineTo(nx, ny);
      x = nx;
      y = ny;
    }
  }
  strokeBuckets(ctx, paths);
}

function createAir(speed: number): Air {
  return {
    noise: createNoise(7),
    time: 0,
    // A still frame (speed 0) is still traced with the default wind.
    wind: WIND * (speed > 0 ? speed : 1),
  };
}

/** Camada de vento para o fundo de uma seção. A cor vem do CSS (`color` do canvas). */
export function FlowField({ density = 1, speed = 1, className }: { density?: number; speed?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const still = speed <= 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const air = createAir(speed);
    const particles = new Particles();
    const size = { width: 0, height: 0 };
    let color = '';
    let raf = 0;
    let lastStep = 0;
    let lastCleanup = 0;
    let visible = true;

    const countFor = (w: number) => Math.round(BASE_COUNT * Math.max(density, 0) * (w < 520 ? 0.5 : 1));

    const paintStill = () => {
      ctx.clearRect(0, 0, size.width, size.height);
      ctx.strokeStyle = color;
      drawStill(ctx, air, size, Math.round((countFor(size.width) * STILL_LINES) / BASE_COUNT));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      size.width = rect.width;
      size.height = rect.height;
      canvas.width = Math.max(1, Math.round(size.width * dpr));
      canvas.height = Math.max(1, Math.round(size.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'butt';
      ctx.lineWidth = 1.2;
      color = getComputedStyle(canvas).color;
      particles.resize(countFor(size.width), size.width, size.height);
      if (still) paintStill();
    };

    // O rastro some apagando um pouco de alfa por quadro: o canvas segue transparente sobre a seção.
    const fade = (dt: number, now: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      ctx.globalAlpha = 1 - Math.exp(-dt / TRAIL_TAU);
      ctx.fillRect(0, 0, size.width, size.height);
      if (dt < 0.025 && now - lastCleanup > CLEANUP_MS) {
        lastCleanup = now;
        ctx.globalAlpha = CLEANUP_ALPHA;
        ctx.fillRect(0, 0, size.width, size.height);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      raf = requestAnimationFrame(frame);
      if (now - lastStep < FRAME_MS - 4) return;
      const dt = lastStep ? Math.min((now - lastStep) / 1000, 0.05) : 1 / 30;
      lastStep = now;
      air.time += dt * speed;
      fade(dt, now);
      const paths = BUCKETS.map(() => new Path2D());
      const step: StepContext = { air, particles, paths, width: size.width, height: size.height, dt };
      for (let i = 0; i < particles.count; i++) stepParticle(step, i);
      ctx.strokeStyle = color;
      strokeBuckets(ctx, paths);
    };

    const start = () => {
      if (!raf && visible && !still) {
        lastStep = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    canvas.classList.add('is-ready');
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let onScreen = true;
    const update = () => {
      visible = onScreen && document.visibilityState === 'visible';
      start();
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(host);
    document.addEventListener('visibilitychange', update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [density, speed]);

  return <canvas ref={canvasRef} className={['bg-layer', className].filter(Boolean).join(' ')} aria-hidden="true" />;
}
