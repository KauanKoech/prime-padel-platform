import * as React from 'react';

/** Data table that stacks into cards under 720px (stackOnMobile). */
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'right';
  /** tabular numerals */
  num?: boolean;
  /** Full-width title row when stacked on mobile. */
  primary?: boolean;
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}
export interface TableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey?: string;
  onRowClick?: (row: T) => void;
  stackOnMobile?: boolean;
}
export function Table<T = Record<string, unknown>>(props: TableProps<T>): JSX.Element;
