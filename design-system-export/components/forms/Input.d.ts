import * as React from 'react';

/**
 * Labelled text field (also textarea via `multiline`). 48px tall, 14px radius, green focus ring.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Error message — turns border + hint red. */
  error?: React.ReactNode;
  /** Appends "(opcional)" to the label. */
  optional?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  size?: 'sm' | 'md';
  multiline?: boolean;
  rows?: number;
}
export function Input(props: InputProps): JSX.Element;
