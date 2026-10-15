import React from 'react';

import { Icon } from '../brand/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';
export function Dialog({ open, onClose, title, description, footer, variant = 'center', width, className = '', children }) {
  React.useEffect(function () {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape' && onClose) onClose(); }
    window.addEventListener('keydown', onKey);
    return function () { window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={'pp-dialog' + (variant === 'drawer' ? ' pp-dialog--drawer' : '')} onMouseDown={function (e) { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className={'pp-dialog__panel ' + className} role="dialog" aria-modal="true" style={width ? { maxWidth: width } : undefined}>
        <div className="pp-dialog__head">
          <div>{title ? <h2 className="pp-dialog__title">{title}</h2> : null}{description ? <p className="pp-dialog__desc">{description}</p> : null}</div>
          {onClose ? <IconButton icon={<Icon name="x" size={20} />} label="Fechar" variant="secondary" size="md" onClick={onClose} /> : null}
        </div>
        <div className="pp-dialog__body">{children}</div>
        {footer ? <div className="pp-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
