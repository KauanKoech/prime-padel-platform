import * as React from 'react';

/** Native select styled like Input, with chevron. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  size?: 'sm' | 'md';
  iconLeft?: React.ReactNode;
}
export function Select(props: SelectProps): JSX.Element;
