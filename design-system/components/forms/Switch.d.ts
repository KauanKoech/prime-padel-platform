import * as React from 'react';

/** On/off toggle. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
export function Switch(props: SwitchProps): JSX.Element;
