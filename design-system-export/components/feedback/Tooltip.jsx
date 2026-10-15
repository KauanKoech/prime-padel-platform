import React from 'react';

export function Tooltip({ label, placement = 'top', open = false, className = '', children }) {
  return (
    <span className={'pp-tip' + (open ? ' pp-tip--open' : '') + ' ' + className}>
      {children}
      <span role="tooltip" className={'pp-tip__bubble' + (placement === 'bottom' ? ' pp-tip__bubble--bottom' : '')}>{label}</span>
    </span>
  );
}
