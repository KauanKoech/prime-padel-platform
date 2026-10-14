import React from 'react';

function initials(name) { if (!name) return ''; var p = String(name).trim().split(/\s+/); return ((p[0] || '').charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase(); }
export function Avatar({ name, src, size = 'md', tone = 'tint', className = '', ...rest }) {
  return (
    <span className={['pp-avatar', 'pp-avatar--' + size, tone === 'brand' ? 'pp-avatar--brand' : '', className].join(' ')} title={name} {...rest}>
      {src ? <img src={src} alt={name || ''} /> : initials(name)}
    </span>
  );
}
