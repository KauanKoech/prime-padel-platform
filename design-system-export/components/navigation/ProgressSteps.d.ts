import * as React from 'react';

/** Progress indicator for multi-step flows (booking). */
export interface ProgressStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[];
  /** 0-based current step. */
  current?: number;
  /** bar = mobile segmented bar + label; numbered = desktop numbered row. */
  variant?: 'bar' | 'numbered';
}
export function ProgressSteps(props: ProgressStepsProps): JSX.Element;
