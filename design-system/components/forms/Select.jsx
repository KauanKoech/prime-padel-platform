import React from 'react';

import { Icon } from '../brand/Icon.jsx';
export function Select({ label, hint, error, options = [], placeholder, size = 'md', disabled, id, iconLeft, className = '', children, ...rest }) {
  const auto = React.useId();
  const fid = id || auto;
  const cls = ['pp-field', error ? 'pp-field--error' : '', disabled ? 'pp-field--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {label ? <label className="pp-field__label" htmlFor={fid}>{label}</label> : null}
      <div className={'pp-control pp-control--' + size}>
        {iconLeft ? <span style={{ display: 'inline-flex' }}>{iconLeft}</span> : null}
        <select id={fid} aria-invalid={error ? true : undefined} aria-describedby={error || hint ? fid+'-hint' : undefined} disabled={disabled} {...rest}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map(function (o) { var v = typeof o === 'string' ? o : o.value; var l = typeof o === 'string' ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
          {children}
        </select>
        <span className="pp-control__chev"><Icon name="chevron-down" size={18} /></span>
      </div>
      {error || hint ? <span className="pp-field__hint" id={fid+'-hint'}>{error || hint}</span> : null}
    </div>
  );
}
