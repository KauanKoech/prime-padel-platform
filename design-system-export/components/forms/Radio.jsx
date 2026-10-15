import React from 'react';

export function Radio({ label, description, disabled, className = '', ...rest }) {
  return (
    <label className={['pp-check', disabled ? 'pp-check--disabled' : '', className].join(' ')}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="pp-check__box pp-check__box--radio" />
      {label != null ? <span>{label}{description ? <span className="pp-check__desc">{description}</span> : null}</span> : null}
    </label>
  );
}
