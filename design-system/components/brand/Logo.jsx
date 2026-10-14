import React from 'react';
import green from '../../assets/brand/prime-padel-green.png';
import white from '../../assets/brand/prime-padel-white.png';
import ink from '../../assets/brand/prime-padel-ink.png';
import openWhite from '../../assets/brand/open-prime-padel-white.png';
import openGreen from '../../assets/brand/open-prime-padel-green.png';
const images = { primary: {green, white, ink}, open: {green:openGreen,white:openWhite,ink:openGreen} };
export function Logo({ color = 'green', variant = 'primary', height, basePath: _basePath, alt, style, className='', ...rest }) {
 return <img className={'pp-logo '+className} src={images[variant][color]} alt={alt ?? (variant === 'open' ? '1º Open Prime Padel' : 'Prime Padel')} style={{height:height ?? 'var(--space-10)',width:'auto',...style}} {...rest} />;
}
