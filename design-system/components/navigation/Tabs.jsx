import React from 'react';

export function Tabs({ tabs = [], value, defaultValue, onChange, className = '', ...rest }) {
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : (tabs[0] && tabs[0].value));
  const cur = value !== undefined ? value : inner;
  return (
    <div role="tablist" className={'pp-tabs ' + className} {...rest}>
      {tabs.map(function (t, i) {
        return (
          <button key={t.value} role="tab" tabIndex={cur === t.value ? 0 : -1} onKeyDown={e => { const next = e.key === 'ArrowRight' ? (i+1)%tabs.length : e.key === 'ArrowLeft' ? (i-1+tabs.length)%tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length-1 : -1; if(next >= 0){e.preventDefault(); e.currentTarget.parentElement.children[next].focus(); setInner(tabs[next].value); onChange?.(tabs[next].value);} }} type="button" className="pp-tab" aria-selected={cur === t.value} onClick={function () { setInner(t.value); if (onChange) onChange(t.value); }}>
            {t.icon}{t.label}{t.count != null ? <span className="pp-tab__count">{t.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
