import * as React from 'react';

/**
 * Modal dialog. Centered on desktop, bottom sheet under 640px; `variant="drawer"` slides from the right on desktop.
 */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'center' | 'drawer';
  width?: number | string;
  className?: string;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element;
