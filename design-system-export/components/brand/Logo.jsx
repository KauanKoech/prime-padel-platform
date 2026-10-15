import React from 'react';

export function Logo({ color = 'green', variant = 'primary', height = 48, basePath = '', alt, style, ...rest }) {
  const file = (variant === 'open' ? 'open-prime-padel-' : 'prime-padel-') + color + '.png';
  return <img className="pp-logo" src={basePath + 'assets/logo/' + file} alt={alt || (variant === 'open' ? '1º Open Prime Padel' : 'Prime Padel')} style={Object.assign({ height: height, width: 'auto' }, style)} {...rest} />;
}
