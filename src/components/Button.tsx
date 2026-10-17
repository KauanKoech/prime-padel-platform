import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Botão da Prime Padel (pílula, como em design-system-export/components/actions/Button).
 * Variantes do claro: `primary` verde, `outline`, `tint`, `ghost` (usadas também na janela de agendamento).
 * Variantes do escuro: `ball` (amarelo da bola, a ação principal da vista), `onBrand` creme e `outlineOnBrand`.
 *
 * Rótulo que desliza no hover e no foco: adaptado do kokonutui — Slide Text Button
 * (https://kokonutui.com, @kokonut-labs, licença MIT). Mudanças: sem Next.js nem Tailwind (CSS em
 * `components.css`, classes `.btn__label`/`.btn__text`), a cópia de baixo é `aria-hidden` e o efeito
 * só existe com mouse e sem movimento reduzido.
 */
type Variant = 'primary' | 'ball' | 'onBrand' | 'outline' | 'outlineOnBrand' | 'tint' | 'ghost';
type Common = { variant?: Variant; size?: 'sm' | 'md' | 'lg'; block?: boolean; iconLeft?: ReactNode; iconRight?: ReactNode };

const classes = ({ variant = 'primary', size = 'md', block }: Common, extra?: string) =>
  ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', extra].filter(Boolean).join(' ');

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="btn__label">
      <span className="btn__text">{children}</span>
      <span className="btn__text btn__text--next" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function Button({ variant, size, block, iconLeft, iconRight, className, children, type = 'button', ...rest }: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={classes({ variant, size, block }, className)} {...rest}>
      {iconLeft}
      <Label>{children}</Label>
      {iconRight}
    </button>
  );
}

export function ButtonLink({ variant, size, block, iconLeft, iconRight, className, children, external, ...rest }: Common & ComponentPropsWithoutRef<'a'> & { external?: boolean }) {
  return (
    <a className={classes({ variant, size, block }, className)} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {iconLeft}
      <Label>{children}</Label>
      {iconRight}
    </a>
  );
}
