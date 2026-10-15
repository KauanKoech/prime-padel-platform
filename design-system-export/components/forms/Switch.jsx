import React from 'react';

export function Switch({ label, disabled, className = '', ...rest }) {
  return (
    <label className={['pp-switch', disabled ? 'pp-switch--disabled' : '', className].join(' ')}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="pp-switch__track" />
      {label != null ? <span>{label}</span> : null}
    </label>
  );
}
