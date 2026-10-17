import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Botão da Prime Padel (pílula, como em design-system-export/components/actions/Button).
 * `primary` verde, `onBrand` branco sobre verde, `outline` e `outlineOnBrand` secundários, `tint` verde claro.
 */
type Variant = 'primary' | 'onBrand' | 'outline' | 'outlineOnBrand' | 'tint' | 'ghost';
type Common = { variant?: Variant; size?: 'sm' | 'md' | 'lg'; block?: boolean; iconLeft?: ReactNode; iconRight?: ReactNode };

const classes = ({ variant = 'primary', size = 'md', block }: Common, extra?: string) =>
  ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', extra].filter(Boolean).join(' ');

export function Button({ variant, size, block, iconLeft, iconRight, className, children, type = 'button', ...rest }: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={classes({ variant, size, block }, className)} {...rest}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

export function ButtonLink({ variant, size, block, iconLeft, iconRight, className, children, external, ...rest }: Common & ComponentPropsWithoutRef<'a'> & { external?: boolean }) {
  return (
    <a className={classes({ variant, size, block }, className)} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </a>
  );
}
