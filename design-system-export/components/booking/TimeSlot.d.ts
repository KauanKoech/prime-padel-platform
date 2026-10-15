import * as React from 'react';

/** A bookable time slot button. Lay out in a 3-col (mobile) / 4–6-col grid. */
export interface TimeSlotProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  time: string;
  /** Price or note under the time, e.g. "R$ 160". Defaults to status text. */
  meta?: React.ReactNode;
  status?: 'available' | 'selected' | 'unavailable' | 'pending';
  /** Peak hour marker (ball-yellow dot). */
  peak?: boolean;
}
export function TimeSlot(props: TimeSlotProps): JSX.Element;
