/*
 * CardNav: adaptado de React Bits (https://reactbits.dev, licença MIT).
 * A pílula do cabeçalho cresce com uma mola e revela um cartão por grupo de seções, um depois do outro.
 * Mudanças: TypeScript, só o modo estreito (é o menu do celular; no desktop os links ficam na pílula), sem GSAP
 * (a mola roda num requestAnimationFrame próprio), cores e vidro da Prime no CSS (landing.css), ícones do Lucide,
 * "Agendar" no amarelo da bola na barra e no fim do painel. Sem a abertura por hover.
 */
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { ArrowUpRight } from './Icons';

export type CardNavItem = { label: string; description: string; links: { href: string; label: string }[] };

type Props = {
  logo: ReactNode;
  /** ação fixa na barra, ao lado do botão do menu */
  action: ReactNode;
  items: CardNavItem[];
  /** último bloco do painel (ex.: botão de agendar); recebe uma função que fecha o menu */
  footer: (close: () => void) => ReactNode;
  labels: { open: string; close: string; nav: string };
  onNavigate: (href: string) => void;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const STAGGER = 0.12;
const BOUNCE = 0.2;

export function CardNav({ logo, action, items, footer, labels, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const engineRef = useRef<{ wake: () => void; refresh: () => void } | null>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // mola: a altura do painel e a entrada dos cartões seguem um único progresso p (0 fechado, 1 aberto)
  useEffect(() => {
    const panel = panelRef.current;
    const bar = barRef.current;
    const content = contentRef.current;
    if (!panel || !bar || !content) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { p: openRef.current ? 1 : 0, v: 0, height: content.offsetHeight };
    let raf = 0;
    let last = 0;

    const render = () => {
      panel.style.height = `${bar.offsetHeight + Math.max(0, state.p) * state.height}px`;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      const lag = cards.length > 1 ? Math.min(STAGGER, 0.7 / (cards.length - 1)) : 0;
      const span = 1 - lag * (cards.length - 1);
      cards.forEach((card, i) => {
        const local = clamp((state.p - i * lag) / Math.max(span, 0.05), 0, 1);
        const e = easeOut(local);
        card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
        card.style.opacity = `${e}`;
      });
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = openRef.current ? 1 : 0;
      if (reduce) {
        state.p = target;
        state.v = 0;
      } else {
        const k = 160;
        const zeta = target ? 1 - 0.68 * BOUNCE : 1;
        const steps = Math.ceil(dt / (1 / 240));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          state.v += (-k * (state.p - target) - 2 * zeta * Math.sqrt(k) * state.v) * h;
          state.p += state.v * h;
        }
      }
      const done = Math.abs(state.p - target) < 0.0005 && Math.abs(state.v) < 0.002;
      if (done) {
        state.p = target;
        state.v = 0;
      }
      render();
      if (done && target === 0) setShown(false);
      if (!done) raf = requestAnimationFrame(tick);
    };

    engineRef.current = {
      wake: () => {
        if (raf) return;
        last = 0;
        raf = requestAnimationFrame(tick);
      },
      refresh: () => {
        state.height = content.offsetHeight;
        render();
      },
    };
    render();
    const ro = new ResizeObserver(() => engineRef.current?.refresh());
    ro.observe(content);
    ro.observe(bar);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      engineRef.current = null;
    };
  }, [items.length]);

  useLayoutEffect(() => {
    openRef.current = open;
    engineRef.current?.refresh();
    engineRef.current?.wake();
  }, [open]);

  // toque fora fecha; Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuRef.current?.focus();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  // o painel fica visível desde o clique até a mola terminar de fechar
  const toggle = () => {
    if (!open) setShown(true);
    setOpen(!open);
  };
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    onNavigate(href);
  };

  return (
    <div ref={rootRef} className="card-nav" data-open={open ? '' : undefined} data-shown={shown || open ? '' : undefined}>
      <nav ref={panelRef} className="card-nav__panel" aria-label={labels.nav}>
        <div ref={barRef} className="card-nav__bar">
          {logo}
          <div className="card-nav__actions">
            {action}
            <button
              ref={menuRef}
              type="button"
              className="card-nav__menu"
              aria-label={open ? labels.close : labels.open}
              aria-expanded={open}
              aria-controls="menu-cards"
              onClick={toggle}
            >
              <span className="card-nav__burger" aria-hidden="true">
                <span className="card-nav__line card-nav__line--top" />
                <span className="card-nav__line card-nav__line--bottom" />
              </span>
            </button>
          </div>
        </div>

        <div ref={contentRef} id="menu-cards" className="card-nav__content" aria-hidden={!open}>
          {items.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="card-nav__card"
            >
              <span className="card-nav__label">{item.label}</span>
              <p className="card-nav__description">{item.description}</p>
              <ul className="card-nav__links">
                {item.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="card-nav__link" tabIndex={open ? undefined : -1} onClick={(e) => go(e, l.href)}>
                      <span className="card-nav__arrow" aria-hidden="true">
                        <ArrowUpRight className="card-nav__arrow-icon card-nav__arrow-icon--out" strokeWidth={2} />
                        <ArrowUpRight className="card-nav__arrow-icon card-nav__arrow-icon--in" strokeWidth={2} />
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div
            ref={(el) => {
              cardRefs.current[items.length] = el;
            }}
            className="card-nav__footer"
            inert={!open}
          >
            {footer(close)}
          </div>
        </div>
        <span className="card-nav__rim" aria-hidden="true" />
      </nav>
    </div>
  );
}
