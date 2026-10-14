import React from 'react';

export function Tooltip({ label, placement = 'top', open = false, className = '', children }) {
  const id = React.useId();
  return (
    <span className={'pp-tip' + (open ? ' pp-tip--open' : '') + ' ' + className}>
      {React.isValidElement(children) ? React.cloneElement(children, { 'aria-describedby': [children.props['aria-describedby'],id].filter(Boolean).join(' ') }) : children}
      <span id={id} role="tooltip" className={'pp-tip__bubble' + (placement === 'bottom' ? ' pp-tip__bubble--bottom' : '')}>{label}</span>
    </span>
  );
}
