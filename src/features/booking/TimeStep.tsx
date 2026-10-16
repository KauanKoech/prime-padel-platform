import { courts, offers } from '../../content/courts';
import { formatDuration, formatPrice } from '../../domain/format';
import type { BookingActions, BookingState } from './booking-state';
import { DateStrip } from './DateStrip';
import { SlotGrid } from './SlotGrid';
import styles from './booking.module.css';

export function TimeStep({ state, actions }: { state: BookingState; actions: BookingActions }) {
  return <>
    <DateStrip state={state} actions={actions} />
    <fieldset className={styles.block}>
      <legend>Quadra</legend>
      <div className={styles.courts}>{courts.map(court => <label className={styles.choice} key={court.id}>
        <input type="radio" name="court" checked={state.draft.courtId === court.id}
          onChange={() => actions.setCourt(court.id)} aria-label={court.name} />
        <span className={styles.courtName} aria-hidden="true">{court.name}</span>
      </label>)}</div>
    </fieldset>
    <fieldset className={styles.block}>
      <legend>Duração</legend>
      <p className={styles.hint}>Valores por quadra e duração.</p>
      {!state.draft.courtId && <p>Escolha uma quadra para ver as durações.</p>}
      <div className={styles.durations}>{offers.filter(offer => offer.courtId === state.draft.courtId).map(offer =>
        <label className={styles.choice} key={offer.id}>
          <input type="radio" name="offer" checked={state.draft.offerId === offer.id}
            onChange={() => actions.setOffer(offer.id)} />
          <span>{formatDuration(offer.durationMinutes)} — {formatPrice(offer.priceCents)}</span>
        </label>)}</div>
    </fieldset>
    <SlotGrid state={state} actions={actions} />
  </>;
}
