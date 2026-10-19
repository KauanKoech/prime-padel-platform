import type { SVGProps } from 'react';

/**
 * Ícones: Lucide (lucide-react), traço 1.75, como pede o design system.
 * O Lucide 1.x não traz mais logos de marcas; o Instagram e a quadra abaixo seguem o mesmo desenho e traço.
 */
export {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  CalendarX,
  Check,
  ChevronLeft,
  CircleAlert,
  Clock,
  GraduationCap,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  RefreshCw,
  ShoppingBag,
  X,
} from 'lucide-react';

export const STROKE = 1.75;

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

/** Quadra de padel vista de cima, no traço do Lucide (paredes, rede e linhas de saque). */
export function CourtIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" />
      <path d="M12 4v16M6.5 5.5v13M17.5 5.5v13M6.5 12h11" />
    </svg>
  );
}
