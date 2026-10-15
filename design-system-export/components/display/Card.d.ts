import * as React from 'react';

/**
 * Generic surface. 20px radius, 1px hairline border by default.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'outlined' | 'elevated' | 'tint' | 'warm' | 'brand' | 'hairline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  as?: 'div' | 'section' | 'article' | 'a' | 'button';
}
export function Card(props: CardProps): JSX.Element;
