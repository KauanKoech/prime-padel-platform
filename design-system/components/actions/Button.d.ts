import * as React from 'react';

/**
 * Primary call-to-action. Pill-shaped, forest-green primary; outline secondary; tint; ghost; on-brand (white on green).
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `onBrand` = white button for green surfaces; `outlineOnBrand` = hairline white outline on green. */
  variant?: 'primary' | 'secondary' | 'tint' | 'ghost' | 'onBrand' | 'outlineOnBrand' | 'danger';
  /** sm 36px · md 44px (min tap target) · lg 52px */
  size?: 'sm' | 'md' | 'lg';
  /** Full width (mobile CTAs, sticky booking footer). */
  block?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Render as another element, e.g. 'a'. */
  as?: 'button' | 'a';
  href?: string;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
