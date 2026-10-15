import React from 'react';

export function Table({ columns = [], rows = [], rowKey = 'id', onRowClick, stackOnMobile = true, className = '', ...rest }) {
  return (
    <div className={['pp-table-wrap', stackOnMobile ? 'pp-table-wrap--stack' : '', className].join(' ')} {...rest}>
      <div className="pp-table-box"><table className={'pp-table' + (onRowClick ? ' pp-table--clickable' : '')}>
        <thead>
          <tr>{columns.map(function (c) { return <th key={c.key} className={c.align === 'right' ? 'is-right' : ''} style={c.width ? { width: c.width } : undefined}>{c.header}</th>; })}</tr>
        </thead>
        <tbody>
          {rows.map(function (r, i) {
            return (
              <tr key={r[rowKey] != null ? r[rowKey] : i} onClick={onRowClick ? function () { onRowClick(r); } : undefined}>
                {columns.map(function (c) {
                  var cls = [c.align === 'right' ? 'is-right' : '', c.num ? 'is-num' : ''].join(' ');
                  return <td key={c.key} className={cls} data-label={typeof c.header === 'string' ? c.header : ''} data-primary={c.primary ? '' : undefined}>{c.render ? c.render(r) : r[c.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table></div>
    </div>
  );
}
