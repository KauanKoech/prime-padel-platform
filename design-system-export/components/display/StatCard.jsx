import React from 'react';

import { Badge } from './Badge.jsx';
export function StatCard({ label, value, unit, icon, delta, deltaTone = 'success', foot, progress, variant = 'default', className = '', ...rest }) {
  return (
    <div className={['pp-stat', variant !== 'default' ? 'pp-stat--' + variant : '', className].join(' ')} {...rest}>
      <div className="pp-stat__top">
        <span className="pp-stat__label">{label}</span>
        {icon ? <span className="pp-stat__icon">{icon}</span> : null}
      </div>
      <div className="pp-stat__value">{value}{unit ? <small>{unit}</small> : null}</div>
      {progress != null ? <div className="pp-stat__bar"><i style={{ width: Math.max(0, Math.min(100, progress)) + '%' }} /></div> : null}
      {delta || foot ? <div className="pp-stat__foot">{delta ? <Badge tone={variant === 'brand' ? 'ball' : deltaTone} size="sm">{delta}</Badge> : null}{foot ? <span>{foot}</span> : null}</div> : null}
    </div>
  );
}
