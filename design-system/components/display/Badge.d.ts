import * as React from 'react';

/**
 * Small status pill. Booking statuses map: Confirmada=success, Pendente=warning, Cancelada=danger, Aula=info, Bloqueada=neutral.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'brand' | 'solid' | 'success' | 'warning' | 'danger' | 'info' | 'ball' | 'outline';
  /** Leading status dot. */
  dot?: boolean;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
