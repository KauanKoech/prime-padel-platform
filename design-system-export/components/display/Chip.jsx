import React from 'react';

export function Chip({ selected = false, dot = false, count, icon, className = '', children, ...rest }) {
  return (
    <button type="button" aria-pressed={selected} className={'pp-chip ' + className} {...rest}>
      {dot ? <span className="pp-chip__dot" /> : null}
      {icon}
      <span>{children}</span>
      {count != null ? <span className="pp-chip__count">{count}</span> : null}
    </button>
  );
}
