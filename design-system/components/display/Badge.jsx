import React from 'react';

export function Badge({ tone = 'neutral', dot = false, size = 'md', icon, className = '', children, ...rest }) {
  return <span className={['pp-badge', 'pp-badge--' + tone, dot ? 'pp-badge--dot' : '', size === 'sm' ? 'pp-badge--sm' : '', className].join(' ')} {...rest}>{icon}{children}</span>;
}
