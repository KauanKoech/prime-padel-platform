import { courts, offers } from '../../content/courts';
import type { BookingConfirmation } from '../../domain/booking';
import { formatArenaDate, formatArenaTime, formatDuration, formatPrice } from '../../domain/format';
import type { BookingActions, BookingState } from './booking-state';
import styles from './booking.module.css';

export function BookingDetails({ details }: { details: Omit<BookingConfirmation, 'simulated'> }) {
  return <dl className={styles.reviewRows}>
    <div><dt>Nome fictício</dt><dd>{details.fictitiousName}</dd></div>
    <div><dt>Quadra</dt><dd>{details.court.name}</dd></div>
    <div><dt>Data</dt><dd>{formatArenaDate(details.slot.date)}</dd></div>
    <div><dt>Horário</dt><dd>{formatArenaTime(details.slot.startsAt)} até {formatArenaTime(details.slot.endsAt)}</dd></div>
    <div><dt>Duração</dt><dd>{formatDuration(details.offer.durationMinutes)}</dd></div>
    <div><dt>Valor por quadra e duração</dt><dd>{formatPrice(details.offer.priceCents)}</dd></div>
  </dl>;
}

export function ReviewStep({ state, actions }: { state: BookingState; actions: BookingActions }) {
  const court = courts.find(court => court.id === state.draft.courtId);
  const offer = offers.find(offer => offer.id === state.draft.offerId);
  if (!court || !offer || !state.draft.slot) return null;
  return <section className={styles.block} aria-label="Detalhes da simulação">
    <h2>Confira sua escolha</h2>
    <BookingDetails details={{ court, offer, slot: state.draft.slot, fictitiousName: state.draft.fictitiousName }} />
    <p className={styles.hint}>Ao simular, nenhum pedido será enviado à arena. Não há cobrança.</p>
    <div className={styles.editActions}>
      <button className="button button-secondary" disabled={state.submitting} onClick={() => actions.goTo('time')}>Editar horário</button>
      <button className="button button-secondary" disabled={state.submitting} onClick={() => actions.goTo('details')}>Editar dados</button>
    </div>
    <button className="button button-secondary" disabled={state.submitting} onClick={() => actions.goTo('details')}>Voltar</button>
  </section>;
}
