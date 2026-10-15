import React from 'react';

export function Tabs({ tabs = [], value, defaultValue, onChange, className = '', ...rest }) {
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : (tabs[0] && tabs[0].value));
  const cur = value !== undefined ? value : inner;
  return (
    <div role="tablist" className={'pp-tabs ' + className} {...rest}>
      {tabs.map(function (t) {
        return (
          <button key={t.value} role="tab" type="button" className="pp-tab" aria-selected={cur === t.value} onClick={function () { setInner(t.value); if (onChange) onChange(t.value); }}>
            {t.icon}{t.label}{t.count != null ? <span className="pp-tab__count">{t.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
