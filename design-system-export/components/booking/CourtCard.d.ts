import * as React from 'react';

/** Court presentation — full card (landing / court list) or compact selectable row (booking). */
export interface CourtCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  name: string;
  /** Photo URL. Omitted → green panel with the white Prime Padel mark. */
  image?: string;
  tags?: string[];
  price?: React.ReactNode;
  priceUnit?: string;
  availability?: React.ReactNode;
  /** Overlay badge on the media (full variant only). */
  flag?: React.ReactNode;
  compact?: boolean;
  selected?: boolean;
  onClick?: () => void;
  /** Prefix for asset paths (e.g. "../../"). */
  basePath?: string;
  /** Action slot (full variant), e.g. a Button. */
  children?: React.ReactNode;
}
export function CourtCard(props: CourtCardProps): JSX.Element;
