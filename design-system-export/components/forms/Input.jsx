import React from 'react';

export function Input({ label, hint, error, optional, iconLeft, iconRight, size = 'md', disabled, id, multiline, rows = 4, className = '', ...rest }) {
  const auto = React.useId();
  const fid = id || auto;
  const cls = ['pp-field', error ? 'pp-field--error' : '', disabled ? 'pp-field--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {label ? <label className="pp-field__label" htmlFor={fid}>{label}{optional ? <em> (opcional)</em> : null}</label> : null}
      <div className={'pp-control pp-control--' + size + (multiline ? ' pp-control--area' : '')}>
        {iconLeft ? <span style={{ display: 'inline-flex' }}>{iconLeft}</span> : null}
        {multiline ? <textarea id={fid} rows={rows} disabled={disabled} {...rest} /> : <input id={fid} disabled={disabled} {...rest} />}
        {iconRight ? <span style={{ display: 'inline-flex' }}>{iconRight}</span> : null}
      </div>
      {error || hint ? <span className="pp-field__hint">{error || hint}</span> : null}
    </div>
  );
}
