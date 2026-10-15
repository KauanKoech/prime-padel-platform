import React from 'react';

import { Icon } from '../brand/Icon.jsx';
export function Accordion({ items = [], defaultOpen = 0, multiple = false, className = '', ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen == null ? [] : [defaultOpen]);
  function toggle(i) {
    setOpen(function (o) { var has = o.indexOf(i) >= 0; if (multiple) return has ? o.filter(function (x) { return x !== i; }) : o.concat([i]); return has ? [] : [i]; });
  }
  return (
    <div className={'pp-acc ' + className} {...rest}>
      {items.map(function (it, i) {
        var isOpen = open.indexOf(i) >= 0;
        return (
          <div key={i} className={'pp-acc__item' + (isOpen ? ' pp-acc__item--open' : '')}>
            <button type="button" className="pp-acc__head" aria-expanded={isOpen} onClick={function () { toggle(i); }}>
              <span>{it.q}</span><span className="pp-acc__chev"><Icon name="chevron-down" size={20} /></span>
            </button>
            {isOpen ? <div className="pp-acc__panel">{it.a}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
