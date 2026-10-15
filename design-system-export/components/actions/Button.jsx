import React from 'react';

export function Button({ variant = 'primary', size = 'md', block = false, iconLeft, iconRight, disabled, children, className = '', as = 'button', ...rest }) {
  const Tag = as;
  const cls = ['pp-btn', `pp-btn--${variant}`, `pp-btn--${size}`, block ? 'pp-btn--block' : '', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} disabled={Tag === 'button' ? disabled : undefined} aria-disabled={disabled || undefined} {...rest}>
      {iconLeft ? <span className="pp-btn__icon">{iconLeft}</span> : null}
      {children != null ? <span>{children}</span> : null}
      {iconRight ? <span className="pp-btn__icon">{iconRight}</span> : null}
    </Tag>
  );
}
