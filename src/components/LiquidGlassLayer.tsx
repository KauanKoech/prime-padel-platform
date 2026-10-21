import type { CSSProperties } from 'react';
import { useLiquidGlass } from './LiquidGlass';

type Props = { className: string; borderRadius?: number; borderWidth?: number; blur?: number; distortionScale?: number };

/**
 * Camada de vidro atrás do conteúdo (posicionada pelo CSS com inset: 0): o desfoque e o tom vêm da classe; no
 * Chromium e no desktop o CSS soma a refração (`.liquid-ok … .liquid-on`, com o filtro em `--liquid`).
 */
export function LiquidGlassLayer({ className, ...options }: Props) {
  const { ref, filterId, defs } = useLiquidGlass<HTMLSpanElement>(options);
  return (
    <span ref={ref} className={`${className} liquid-on`} style={{ '--liquid': `url(#${filterId})` } as CSSProperties} aria-hidden="true">
      {defs}
    </span>
  );
}
