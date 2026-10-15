import * as React from 'react';

/** Radio with label + optional description. Group by `name`. */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
export function Radio(props: RadioProps): JSX.Element;
