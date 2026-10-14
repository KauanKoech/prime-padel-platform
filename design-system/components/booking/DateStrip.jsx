import React from 'react';

export function DateStrip({ days = [], value, onChange, className = '', ...rest }) {
  return (
    <div className={'pp-dates ' + className} role="group" aria-label="Datas disponíveis para simular" {...rest}>
      {days.map(function (d) {
        var cls = 'pp-date' + (d.today ? ' pp-date--today' : '');
        return (
          <button key={d.key} type="button" className={cls} aria-pressed={value === d.key} disabled={d.disabled} onClick={function () { if (onChange) onChange(d.key); }}>
            <span className="pp-date__wd">{d.weekday}</span>
            <span className="pp-date__day">{d.day}</span>
            {d.month ? <span className="pp-date__mo">{d.month}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
