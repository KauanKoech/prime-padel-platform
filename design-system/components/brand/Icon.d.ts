import * as React from 'react';

/** Lucide icon by kebab-case name. Requires lucide UMD (https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js) loaded before render. */
export interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}
export function Icon(props: IconProps): JSX.Element;
