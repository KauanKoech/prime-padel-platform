/*
 * BackgroundPaths: adaptado do kokonutui — Background Paths (https://kokonutui.com, @dorianbaffier, licença MIT).
 * Uma fita de linhas que flui devagar em três camadas de profundidade, sozinha.
 * Mudanças: vira uma camada decorativa (canvas dentro da seção), sem Tailwind nem `cn`, sem conteúdo padrão e sem
 * o relógio de troca de tema; cor vinda do CSS (`color` do canvas); DPR até 1,5; pausa fora da tela e com a aba
 * oculta; com movimento reduzido as linhas aparecem inteiras e paradas. Sem a interação com o mouse e repintado a
 * ~30 quadros por segundo (o fluxo é lento), para não pesar.
 */
import { useEffect, useRef } from 'react';

const SAMPLES = 64;
const OVERSCAN = 0.06;
const DRAW_MS = 1400;
const DRAW_STAGGER_MS = 40;
/** O fluxo é lento: ~30 quadros por segundo bastam. */
const PAINT_MS = 33;

type Layer = { width: number; opacity: number; phase: number; pace: number };
const LAYERS: Layer[] = [
  { width: 1, opacity: 0.16, phase: 0.6, pace: 0.7 },
  { width: 1.25, opacity: 0.26, phase: 0.3, pace: 0.85 },
  { width: 1.5, opacity: 0.4, phase: 0, pace: 1 },
];

type Frame = { width: number; height: number; time: number; drawn: number[] };
type Shape = { count: number; spread: number; slope: number };

/** Altura da linha `s` (-0,5 a 0,5 na fita) no ponto `u` (0 a 1 ao longo dela). */
function lineY(s: number, u: number, layer: Layer, frame: Frame, shape: Shape, band: number) {
  const t = frame.time * layer.pace;
  const x = u * frame.width;
  const center = frame.height * 0.5 + shape.slope * (x - frame.width / 2) + band * 0.1 * Math.sin(Math.PI * 2 * (0.75 * u + 0.1) + layer.phase + t * 0.35);
  const turn = 0.22 + 0.09 * Math.sin(t * 0.21 + layer.phase);
  const breathe = 0.3 * Math.sin(t * 0.5 + s * 4 + layer.phase);
  const twist = Math.cos(Math.PI * (u - turn) + s * (0.6 + breathe) + layer.phase);
  return center + s * shape.spread * band * twist;
}

function drawLines(ctx: CanvasRenderingContext2D, frame: Frame, shape: Shape, color: string) {
  const { width, height } = frame;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const band = Math.min(height, width * 1.1);
  const perLayer = Math.max(1, Math.round(shape.count / LAYERS.length));
  const xs = new Float32Array(SAMPLES + 1);
  const ys = new Float32Array(SAMPLES + 1);
  LAYERS.forEach((layer, li) => {
    ctx.lineWidth = layer.width;
    for (let i = 0; i < perLayer; i++) {
      const drawn = frame.drawn[li * perLayer + i] ?? 1;
      if (drawn <= 0) continue;
      const s = perLayer === 1 ? 0 : i / (perLayer - 1) - 0.5;
      const last = Math.max(1, Math.ceil(SAMPLES * drawn));
      for (let k = 0; k <= last; k++) {
        const u = -OVERSCAN + (k / SAMPLES) * (1 + OVERSCAN * 2);
        xs[k] = u * width;
        ys[k] = lineY(s, u, layer, frame, shape, band);
      }
      ctx.globalAlpha = layer.opacity * (0.45 + 0.55 * (1 - Math.abs(s) * 2));
      ctx.beginPath();
      ctx.moveTo(xs[0], ys[0]);
      for (let k = 1; k < last; k++) ctx.quadraticCurveTo(xs[k], ys[k], (xs[k] + xs[k + 1]) / 2, (ys[k] + ys[k + 1]) / 2);
      ctx.lineTo(xs[last], ys[last]);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;
}

const EASE_OUT = (t: number) => 1 - (1 - t) ** 3;

type Props = { count?: number; spread?: number; angle?: number; speed?: number; className?: string };

/** Camada de linhas para o fundo de uma seção. A cor vem do CSS (`color` do canvas). */
export function BackgroundPaths({ count = 36, spread = 1, angle = -8, speed = 0.8, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shape: Shape = { count, spread, slope: Math.tan((angle * Math.PI) / 180) };
    const perLayer = Math.max(1, Math.round(count / LAYERS.length));
    const frame: Frame = {
      width: 0,
      height: 0,
      time: 40, // começa no meio do fluxo
      drawn: new Array(perLayer * LAYERS.length).fill(reduce ? 1 : 0),
    };
    let color = getComputedStyle(canvas).color;
    let start = 0;
    let last = 0;
    let raf = 0;
    let visible = true;

    const paint = () => drawLines(ctx, frame, shape, color);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      frame.width = rect.width;
      frame.height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color;
      paint();
    };

    const loop = (now: number) => {
      raf = 0;
      if (!start) {
        start = now;
        last = now;
      }
      if (now - last < PAINT_MS - 4) {
        if (visible) raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      frame.time += dt * speed;
      const elapsed = now - start;
      for (let i = 0; i < frame.drawn.length; i++) {
        if (frame.drawn[i] < 1) frame.drawn[i] = EASE_OUT(Math.min(Math.max((elapsed - (i % perLayer) * DRAW_STAGGER_MS) / DRAW_MS, 0), 1));
      }
      paint();
      if (visible) raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    canvas.classList.add('is-ready');
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let onScreen = true;
    const update = () => {
      visible = onScreen && !document.hidden;
      if (visible) play();
    };
    // a entrada (linhas se desenhando) começa quando a seção aparece
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
  }, [count, spread, angle, speed]);

  return <canvas ref={canvasRef} className={['bg-layer', className].filter(Boolean).join(' ')} aria-hidden="true" />;
}
