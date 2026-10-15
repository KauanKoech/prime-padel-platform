import * as React from 'react';

/** Round icon-only button (header actions, close, calendar nav). Always pass `label` for a11y. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  /** Accessible label (also used as title tooltip). */
  label: string;
  variant?: 'ghost' | 'secondary' | 'primary' | 'tint' | 'onBrand';
  size?: 'sm' | 'md' | 'lg';
  /** Notification count/dot rendered top-right. */
  badge?: React.ReactNode;
}
export function IconButton(props: IconButtonProps): JSX.Element;
