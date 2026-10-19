/*
 * SmoothTabs: adaptado do kokonutui — Smooth Tab / Swipe Tabs (https://kokonutui.com, @dorianbaffier,
 * licença MIT). Uma pílula desliza com mola até a aba escolhida.
 * Mudanças: TypeScript sem Tailwind (CSS em `landing.css`, `.stabs`), só a lista de abas (o painel fica com
 * quem usa), sem arrastar entre painéis; a pílula é medida no cliente e movida com `animate` do Motion
 * (sem re-render). No HTML pré-renderizado a aba ativa já aparece marcada pelo CSS (`aria-selected`), então
 * nada depende da medição para ser legível. Padrão WAI-ARIA de abas com ativação automática (setas, Home, End).
 */
import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from 'react';
import { animate } from 'motion/react';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 } as const;

type Item = { id: string; label: string };

export function SmoothTabs({ items, active, onChange, label, idPrefix, panelId }: { items: Item[]; active: number; onChange: (i: number) => void; label: string; idPrefix: string; panelId: string }) {
  const list = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const placed = useRef(false);

  useIsoLayout(() => {
    const move = (instant: boolean) => {
      const tab = tabs.current[active];
      const el = pill.current;
      if (!tab || !el) return;
      const target = { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight };
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Sempre pelo Motion (mesmo o salto instantâneo), para ele saber de onde partir na próxima troca.
      animate(el, target, instant || reduce || !placed.current ? { duration: 0 } : SPRING);
      if (!placed.current) {
        placed.current = true;
        list.current?.classList.add('is-measured');
      }
    };
    move(false);
    const ro = new ResizeObserver(() => move(true));
    if (list.current) ro.observe(list.current);
    return () => ro.disconnect();
  }, [active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="stabs" role="tablist" aria-label={label} ref={list}>
      <span className="stabs__pill" ref={pill} aria-hidden="true" />
      {items.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => {
            tabs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-${t.id}`}
          aria-selected={i === active}
          aria-controls={panelId}
          tabIndex={i === active ? 0 : -1}
          className="stabs__tab"
          onClick={() => onChange(i)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
