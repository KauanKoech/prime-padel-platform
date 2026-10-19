import { createContext, useCallback, useContext, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';

export type BookingPreset = { courtId?: string; durationMinutes?: number };

type Ctx = {
  open: boolean;
  preset: BookingPreset;
  /** Abre o agendamento; o elemento que abriu recebe o foco de volta ao fechar. */
  openBooking: (preset?: BookingPreset, opener?: HTMLElement | null) => void;
  closeBooking: () => void;
  returnFocus: () => void;
};

const BookingCtx = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<BookingPreset>({});
  const opener = useRef<HTMLElement | null>(null);

  const openBooking = useCallback((next: BookingPreset = {}, from?: HTMLElement | null) => {
    opener.current = from ?? (document.activeElement as HTMLElement | null);
    setPreset(next);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);
  const returnFocus = useCallback(() => opener.current?.focus({ preventScroll: true }), []);

  const value = useMemo(() => ({ open, preset, openBooking, closeBooking, returnFocus }), [open, preset, openBooking, closeBooking, returnFocus]);
  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error('useBooking precisa do BookingProvider');
  return ctx;
}

/**
 * Props para um link que abre o agendamento. Sem JS ele leva ao contato (#onde-estamos).
 * stopPropagation: o Lenis trata âncoras no document e ignora preventDefault.
 */
export function useBookingTrigger() {
  const { openBooking } = useBooking();
  return (preset?: BookingPreset) => ({
    href: '#onde-estamos',
    'aria-haspopup': 'dialog' as const,
    onClick: (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      e.stopPropagation();
      openBooking(preset, e.currentTarget);
    },
  });
}
