import * as React from 'react';

/** Section label above headings (uppercase, tracked). */
export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** tint pill (default), onBrand (hairline white on green), plain (text with leading rule). */
  variant?: 'tint' | 'onBrand' | 'plain';
  icon?: React.ReactNode;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;
