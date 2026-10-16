import { useEffect, useRef, type ReactNode } from 'react';
import { courts, offers } from '../../content/courts';
import type { BookingDraft } from '../../domain/booking';
import { formatArenaDate, formatArenaTime, formatDuration, formatPrice } from '../../domain/format';
import styles from './booking.module.css';

export function BookingSummary({ draft, children }: { draft: BookingDraft; children?: ReactNode }) {
  const offer = offers.find(offer => offer.id === draft.offerId);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--booking-bar-height', `${bar.current?.offsetHeight ?? 0}px`);
    });
    if (bar.current) observer.observe(bar.current);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--booking-bar-height'); };
  }, []);
  return <aside className={styles.summary} aria-label="Resumo da simulação">
    <div className={styles.block}>
      <h2>Sua escolha</h2>
      <dl className={styles.summaryRows}>
        <div><dt>Quadra</dt><dd>{courts.find(court => court.id === draft.courtId)?.name ?? 'A escolher'}</dd></div>
        <div><dt>Data</dt><dd>{formatArenaDate(draft.date)}</dd></div>
        <div><dt>Horário</dt><dd>{draft.slot ? `${formatArenaTime(draft.slot.startsAt)} até ${formatArenaTime(draft.slot.endsAt)}` : 'A escolher'}</dd></div>
        <div><dt>Duração</dt><dd>{offer ? formatDuration(offer.durationMinutes) : 'A escolher'}</dd></div>
      </dl>
      <div className={styles.summaryAction} ref={bar}>
        <div className={styles.total}>
          <span>{offer ? `Por quadra · ${formatDuration(offer.durationMinutes)}` : 'Selecione uma oferta'}</span>
          <strong>{offer ? formatPrice(offer.priceCents) : 'Valor a definir'}</strong>
        </div>
        {children}
      </div>
    </div>
  </aside>;
}
