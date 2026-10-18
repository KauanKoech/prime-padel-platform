import { useEffect } from 'react';

/*
 * Emendas em onda (<Wave />): maré contínua e lenta, que ganha um pouco de energia com a rolagem.
 * Adaptado das divisórias do projeto jk-software (mesmo autor). Duas camadas de preenchimento (frente e trás)
 * e uma linha fina na crista. Só o atributo `d` muda (sem layout); as pontas cobrem 0..1440, sem fenda nas bordas.
 * O laço só roda com alguma onda visível e a aba ativa. Com movimento reduzido: ondas paradas.
 */

type Params = { base: number; a1: number; f1: number; p1: number; a2: number; f2: number; p2: number; v: number };

// Uma linha por emenda, na ordem em que aparecem na página (as formas variam para não repetir).
const PARAMS: Params[] = [
  { base: 60, a1: 22, f1: 0.72, p1: 2.6, a2: 7, f2: 1.7, p2: 0.4, v: 1.0 },
  { base: 58, a1: 20, f1: 0.88, p1: 1.7, a2: 6, f2: 2.0, p2: 0.9, v: 0.95 },
  { base: 56, a1: 22, f1: 0.8, p1: -1.2, a2: 7, f2: 1.8, p2: 1.6, v: 1.1 },
  { base: 56, a1: 21, f1: 0.95, p1: 0.2, a2: 7, f2: 2.1, p2: 1.1, v: 1.05 },
  { base: 56, a1: 22, f1: 1.05, p1: -0.7, a2: 6, f2: 1.9, p2: 2.0, v: 0.9 },
  { base: 58, a1: 21, f1: 0.85, p1: 1.3, a2: 7, f2: 2.2, p2: 0.6, v: 1.0 },
  { base: 57, a1: 20, f1: 0.78, p1: 0.9, a2: 6, f2: 1.6, p2: 1.4, v: 0.95 },
  { base: 58, a1: 22, f1: 0.92, p1: -2.0, a2: 7, f2: 2.0, p2: 0.2, v: 1.1 },
  { base: 56, a1: 21, f1: 0.7, p1: 2.1, a2: 6, f2: 1.8, p2: 1.0, v: 1.0 },
];
const W = 1440;
const H = 110;
const STEPS = 16;
const TAU = Math.PI * 2;
const REST = 0.45; // rad/s da maré parada
const EXTRA = 2.2; // rad/s a mais com rolagem rápida
const AMP_EXTRA = 0.45; // até +45% de amplitude com rolagem rápida

type Pt = [number, number];
const clampY = (y: number) => Math.max(5, Math.min(105, y));
const points = (fn: (t: number) => number): Pt[] => {
  const pts: Pt[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const x = (W * i) / STEPS;
    pts.push([x, clampY(fn(x / W))]);
  }
  return pts;
};
/** Catmull-Rom convertido em Bézier cúbicas: curva lisa passando por todos os pontos. */
const curve = (pts: Pt[]) => {
  let d = '';
  for (let k = 0; k < pts.length - 1; k++) {
    const p0 = pts[k - 1] || pts[k];
    const p1 = pts[k];
    const p2 = pts[k + 1];
    const p3 = pts[k + 2] || p2;
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};
const filled = (pts: Pt[]) => `M0 ${H + 1}L0 ${pts[0][1].toFixed(1)}${curve(pts)}L${W} ${H + 1}Z`;
const line = (pts: Pt[]) => `M0 ${pts[0][1].toFixed(1)}${curve(pts)}`;

type WaveEl = { svg: SVGSVGElement; c: Params; time: number; visible: boolean; front: SVGPathElement; back: SVGPathElement; crest: SVGPathElement };

function draw(o: WaveEl, phase: number, energy: number) {
  const c = o.c;
  const amp = 1 + AMP_EXTRA * energy;
  const front = points((t) => c.base + c.a1 * amp * Math.sin(TAU * c.f1 * t + c.p1 + phase) + c.a2 * amp * Math.sin(TAU * c.f2 * t + c.p2 - 1.3 * phase));
  const back = points((t) => c.base - 14 + 0.9 * c.a1 * amp * Math.sin(TAU * c.f1 * t + c.p1 + 0.6 + 1.4 * phase) + c.a2 * Math.sin(TAU * c.f2 * t + c.p2 + 1.2 - 0.8 * phase));
  o.front.setAttribute('d', filled(front));
  o.back.setAttribute('d', filled(back));
  o.crest.setAttribute('d', line(front));
}

/** Fase que acompanha a posição da onda na tela: ao rolar, a crista "anda" com a página. */
function scrollPhase(svg: SVGSVGElement) {
  const r = svg.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  const prog = (vh / 2 - (r.top + r.height / 2)) / vh;
  return Math.max(-1.5, Math.min(1.5, prog)) * 2.4;
}

export function useWaves() {
  useEffect(() => {
    const list: WaveEl[] = [...document.querySelectorAll<SVGSVGElement>('[data-wave]')].map((svg, i) => ({
      svg,
      c: PARAMS[i % PARAMS.length],
      time: 0,
      visible: true,
      front: svg.querySelector<SVGPathElement>('.wave__front')!,
      back: svg.querySelector<SVGPathElement>('.wave__back')!,
      crest: svg.querySelector<SVGPathElement>('.wave__crest')!,
    }));
    if (!list.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.forEach((o) => draw(o, 0, 0));
      return;
    }

    let energy = 0;
    let lastY = window.scrollY;
    let lastT = 0;
    let running = false;
    let raf = 0;
    const frame = (now: number) => {
      const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016;
      lastT = now;
      // velocidade da rolagem -> energia (sobe rápido, desce suave em ~0,8 s)
      const y = window.scrollY;
      const vel = Math.abs(y - lastY) / Math.max(dt, 0.001);
      lastY = y;
      const target = Math.min(1, vel / 2200);
      const decay = energy * Math.exp(-dt / 0.8);
      energy = target > decay ? decay + (target - decay) * 0.3 : decay;
      let anyVisible = false;
      list.forEach((o) => {
        o.time += dt * (REST + EXTRA * energy) * o.c.v;
        if (!o.visible) return;
        anyVisible = true;
        draw(o, o.time + scrollPhase(o.svg), energy);
      });
      if (anyVisible && !document.hidden) raf = requestAnimationFrame(frame);
      else {
        running = false;
        lastT = 0;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => list.forEach((o) => o.svg === en.target && (o.visible = en.isIntersecting)));
        start();
      },
      { rootMargin: '120px 0px' },
    );
    list.forEach((o) => io.observe(o.svg));
    list.forEach((o) => draw(o, scrollPhase(o.svg), 0));
    const onVisible = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('scroll', start, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('scroll', start);
    };
  }, []);
}
