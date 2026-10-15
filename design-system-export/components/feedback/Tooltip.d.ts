import * as React from 'react';

/** Hover/focus tooltip. */
export interface TooltipProps {
  label: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible (docs/demo). */
  open?: boolean;
  className?: string;
  children: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
