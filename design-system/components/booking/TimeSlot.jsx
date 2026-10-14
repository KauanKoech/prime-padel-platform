import React from 'react';

export function TimeSlot({ time, meta, status = 'available', peak = false, onClick, className = '', ...rest }) {
  const label = meta != null ? meta : (status === 'unavailable' ? 'Reservado' : status === 'pending' ? 'Aguardando' : '');
  return (
    <button type="button" className={['pp-slot', status !== 'available' ? 'pp-slot--' + status : '', className].join(' ')} aria-pressed={status === 'selected'} disabled={status === 'unavailable' || status === 'pending'} onClick={onClick} {...rest}>
      <span className="pp-slot__time">{time}</span>
      {label ? <span className="pp-slot__meta">{label}</span> : null}
      {peak && status !== 'unavailable' ? <span className="pp-slot__peak" title="Horário nobre" /> : null}
    </button>
  );
}
