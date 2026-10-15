import * as React from 'react';

/**
 * KPI tile for the admin dashboard. Serif numeral, optional delta badge and progress bar.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  icon?: React.ReactNode;
  /** e.g. "+12%" */
  delta?: React.ReactNode;
  deltaTone?: 'success' | 'warning' | 'danger' | 'neutral';
  foot?: React.ReactNode;
  /** 0–100 progress bar (occupancy). */
  progress?: number;
  variant?: 'default' | 'brand' | 'tint';
}
export function StatCard(props: StatCardProps): JSX.Element;
