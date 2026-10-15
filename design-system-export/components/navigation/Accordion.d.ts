import * as React from 'react';

/** FAQ-style accordion; open item gets tint background. */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{ q: React.ReactNode; a: React.ReactNode }>;
  /** Index open by default (null = all closed). */
  defaultOpen?: number | null;
  multiple?: boolean;
}
export function Accordion(props: AccordionProps): JSX.Element;
