import type { SVGProps } from 'react';

/**
 * Ícones: Lucide (lucide-react), traço 1.75, como pede o design system.
 * O Lucide 1.x não traz mais logos de marcas; o Instagram abaixo segue o mesmo desenho e traço.
 */
export { ArrowRight, ArrowUpRight, CalendarDays, CalendarX, Check, ChevronLeft, CircleAlert, Clock, Info, MapPin, Menu, MessageCircle, Navigation, RefreshCw, X } from 'lucide-react';

export const STROKE = 1.75;

export function InstagramIcon({ size = 20, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
