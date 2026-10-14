import React from 'react';

export function SegmentedControl({ options = [], value, defaultValue, onChange, block = false, tone = 'neutral', className = '', ...rest }) {
  const norm = options.map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  const [inner, setInner] = React.useState(defaultValue != null ? defaultValue : (norm[0] && norm[0].value));
  const cur = value !== undefined ? value : inner;
  return (
    <div role="group" className={['pp-seg', block ? 'pp-seg--block' : '', tone === 'brand' ? 'pp-seg--brand' : '', className].join(' ')} {...rest}>
      {norm.map(function (o) {
        return <button key={o.value} type="button" className="pp-seg__opt" aria-pressed={cur === o.value} disabled={o.disabled} onClick={function () { setInner(o.value); if (onChange) onChange(o.value); }}>{o.label}</button>;
      })}
    </div>
  );
}
