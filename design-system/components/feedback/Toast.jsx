import React from 'react';

import { Icon } from '../brand/Icon.jsx';
export function Toast({ tone = 'default', icon, title, description, actionLabel, onAction, onClose, className = '', ...rest }) {
  const ic = icon !== undefined ? icon : <Icon name={tone === 'danger' ? 'circle-alert' : 'circle-check'} size={20} />;
  return (
    <div role="status" className={['pp-toast', tone !== 'default' ? 'pp-toast--' + tone : '', className].join(' ')} {...rest}>
      {ic ? <span className="pp-toast__icon">{ic}</span> : null}
      <div className="pp-toast__body">{title ? <div className="pp-toast__title">{title}</div> : null}{description ? <div className="pp-toast__desc">{description}</div> : null}</div>
      {actionLabel ? <button type="button" className="pp-toast__action" onClick={onAction}>{actionLabel}</button> : null}
      {onClose ? <button type="button" className="pp-toast__close" aria-label="Fechar" onClick={onClose}><Icon name="x" size={18} /></button> : null}
    </div>
  );
}
