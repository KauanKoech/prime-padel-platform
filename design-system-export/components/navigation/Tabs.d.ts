import * as React from 'react';

/**
 * Underline tabs with optional counts.
 */
export interface TabItem { value: string; label: React.ReactNode; count?: React.ReactNode; icon?: React.ReactNode; }
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
