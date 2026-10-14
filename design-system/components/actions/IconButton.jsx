import React from 'react';

export function IconButton({ icon, label, variant = 'ghost', size = 'md', badge, className = '', ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} className={['pp-iconbtn', 'pp-iconbtn--' + variant, 'pp-iconbtn--' + size, className].join(' ')} {...rest}>
      {icon}
      {badge != null && badge !== false ? <span className="pp-iconbtn__badge">{badge}</span> : null}
    </button>
  );
}
