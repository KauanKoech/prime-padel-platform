import React from 'react';

export function Eyebrow({ variant = 'tint', icon, className = '', children, ...rest }) {
  return <span className={['pp-eyebrow', variant !== 'tint' ? 'pp-eyebrow--' + variant : '', className].join(' ')} {...rest}>{icon}{children}</span>;
}
