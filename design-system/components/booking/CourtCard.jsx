import React from 'react';

import whiteLogo from '../../assets/brand/prime-padel-white.png';
import { Badge } from '../display/Badge.jsx';
export function CourtCard({ name, image, tags = [], price, priceUnit = '/ hora', availability, flag, compact = false, selected = false, onClick, basePath: _basePath = '', className = '', children, ...rest }) {
  const cls = ['pp-court', compact ? 'pp-court--compact' : '', onClick ? 'pp-court--interactive' : '', selected ? 'pp-court--selected' : '', className].join(' ');
  return (
    <div className={cls} onClick={onClick} onKeyDown={onClick ? e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} aria-pressed={onClick ? selected : undefined} {...rest}>
      <div className="pp-court__media">
        {image ? <img className="pp-court__photo" src={image} alt={name} /> : <img className="pp-court__mark" src={whiteLogo} alt="" />}
        {flag && !compact ? <span className="pp-court__flag">{flag}</span> : null}
      </div>
      <div className="pp-court__body">
        <div className="pp-court__name">{name}</div>
        {tags.length ? <div className="pp-court__tags">{tags.map(function (t) { return <Badge key={t} tone="neutral" size={compact ? 'sm' : 'md'}>{t}</Badge>; })}</div> : null}
        {compact ? (availability ? <span className="pp-court__avail">{availability}</span> : null) : (
          <div className="pp-court__row">
            <div>
              {price ? <div className="pp-court__price">{price} <small>{priceUnit}</small></div> : null}
              {availability ? <div className="pp-court__avail" style={{ marginTop: 'var(--space-3)' }}>{availability}</div> : null}
            </div>
            {children}
          </div>
        )}
      </div>
      {compact && price ? <div className="pp-court__price" style={{ whiteSpace: 'nowrap' }}>{price}</div> : null}
    </div>
  );
}
