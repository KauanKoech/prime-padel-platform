import React from 'react';

export function Card({ variant = 'outlined', padding = 'md', interactive = false, selected = false, as = 'div', className = '', children, ...rest }) {
  const Tag = as;
  const cls = ['pp-card', variant !== 'outlined' ? 'pp-card--' + variant : '', 'pp-card--p-' + padding, interactive ? 'pp-card--interactive' : '', selected ? 'pp-card--selected' : '', className].filter(Boolean).join(' ');
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
