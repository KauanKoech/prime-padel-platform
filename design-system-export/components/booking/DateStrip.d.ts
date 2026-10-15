import * as React from 'react';

/**
 * Horizontal scroll of day pills for picking a booking date.
 */
export interface DateStripDay { key: string; weekday: string; day: string | number; month?: string; today?: boolean; disabled?: boolean; }
export interface DateStripProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  days: DateStripDay[];
  value?: string;
  onChange?: (key: string) => void;
}
export function DateStrip(props: DateStripProps): JSX.Element;
