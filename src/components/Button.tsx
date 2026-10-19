import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Botão da Prime Padel (pílula, como em design-system-export/components/actions/Button).
 * Variantes do claro: `primary` verde, `outline`, `tint`, `ghost` (usadas também na janela de agendamento).
 * Variantes do escuro: `ball` (amarelo da bola, a ação principal da vista), `onBrand` creme e `outlineOnBrand`.
 *
 * `hoverText`: um segundo texto, diferente do rótulo, que entra no lugar dele no hover e no foco (diz o que
 * acontece ao clicar, ex. "Ver horários" → "Abrir a agenda"). Sem `hoverText` o botão tem só o hover de cor.
 * O efeito é adaptado do kokonutui — Slide Text Button (https://kokonutui.com, @kokonut-labs, licença MIT).
 * Mudanças: sem Next.js nem Tailwind (CSS em `components.css`, `.btn__label`/`.btn__text`), a segunda cópia
 * é `aria-hidden` (o nome acessível continua o rótulo) e o efeito só existe com mouse e sem movimento reduzido.
 */
type Variant = 'primary' | 'ball' | 'onBrand' | 'outline' | 'outlineOnBrand' | 'tint' | 'ghost';
type Common = { variant?: Variant; size?: 'sm' | 'md' | 'lg'; block?: boolean; iconLeft?: ReactNode; iconRight?: ReactNode; hoverText?: string };

const classes = ({ variant = 'primary', size = 'md', block }: Common, slide: boolean, extra?: string) =>
  ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', slide && 'btn--slide', extra].filter(Boolean).join(' ');

function Label({ children, hoverText }: { children: ReactNode; hoverText?: string }) {
  if (!hoverText) return <span>{children}</span>;
  return (
    <span className="btn__label">
      <span className="btn__text">{children}</span>
      <span className="btn__text btn__text--next" aria-hidden="true">
        {hoverText}
      </span>
    </span>
  );
}

export function Button({ variant, size, block, iconLeft, iconRight, hoverText, className, children, type = 'button', ...rest }: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={classes({ variant, size, block }, Boolean(hoverText), className)} {...rest}>
      {iconLeft}
      <Label hoverText={hoverText}>{children}</Label>
      {iconRight}
    </button>
  );
}

export function ButtonLink({ variant, size, block, iconLeft, iconRight, hoverText, className, children, external, ...rest }: Common & ComponentPropsWithoutRef<'a'> & { external?: boolean }) {
  return (
    <a className={classes({ variant, size, block }, Boolean(hoverText), className)} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {iconLeft}
      <Label hoverText={hoverText}>{children}</Label>
      {iconRight}
    </a>
  );
}
