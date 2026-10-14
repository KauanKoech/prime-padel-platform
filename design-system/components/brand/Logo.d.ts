import * as React from 'react';

/**
 * Official Prime Padel wordmark (raster, extracted from PrimePadelLogo.jpg). Consumers must copy assets/logo/*.
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** white on green/dark, green on light, ink for mono print. open variant: white | green only. */
  color?: 'white' | 'green' | 'ink';
  /** primary = Prime Padel; open = 1º Open Prime Padel tournament mark. */
  variant?: 'primary' | 'open';
  height?: number;
  /** Path prefix to project root, e.g. "../../". */
  basePath?: string;
}
export function Logo(props: LogoProps): JSX.Element;
