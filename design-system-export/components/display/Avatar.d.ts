import * as React from 'react';

/** Circular avatar with initials fallback. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tone?: 'tint' | 'brand';
}
export function Avatar(props: AvatarProps): JSX.Element;
