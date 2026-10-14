import * as React from 'react';

/** Selectable filter chip (toggle button). */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Leading dot (ball-yellow when selected). */
  dot?: boolean;
  count?: React.ReactNode;
  icon?: React.ReactNode;
}
export function Chip(props: ChipProps): JSX.Element;
