import * as React from 'react';

/** Checkbox with label + optional description. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
