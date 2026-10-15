import React from 'react';

function toPascal(n) { return String(n).split(/[-_ ]/).map(function (s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join(''); }
function renderNode(node, key) {
  var kids = node[2] || [];
  return React.createElement(node[0], Object.assign({ key: key }, node[1] || {}), kids.map(function (k, i) { return renderNode(k, i); }));
}
export function Icon({ name, size = 20, strokeWidth = 1.75, color = 'currentColor', className = '', style, title }) {
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const node = lib ? lib[toPascal(name)] : null;
  const children = node ? (node[0] === 'svg' ? node[2] : node) : [];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={'pp-icon ' + className} style={Object.assign({ flex: 'none', display: 'inline-block' }, style)} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      {children.map(function (c, i) { return renderNode(c, i); })}
    </svg>
  );
}
