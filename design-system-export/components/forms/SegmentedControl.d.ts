import * as React from 'react';

/** Pill segmented control (2–5 options). Controlled via value/onChange or uncontrolled via defaultValue. */
export interface SegmentedControlProps {
  options: Array<string | { value: string; label: React.ReactNode; disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Stretch to full width with equal segments. */
  block?: boolean;
  /** brand = selected segment filled green. */
  tone?: 'neutral' | 'brand';
  className?: string;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
