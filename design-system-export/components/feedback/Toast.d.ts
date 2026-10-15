import * as React from 'react';

/** Transient notification. Position it yourself (fixed bottom-center on mobile, bottom-right on desktop). */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'light' | 'danger';
  /** Custom icon; null hides it. */
  icon?: React.ReactNode | null;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
