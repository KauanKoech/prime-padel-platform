import { useRef } from 'react';
import { getDateWindow, ARENA_TIME_ZONE } from '../../domain/arena-time';
import { formatArenaDate } from '../../domain/format';
import type { BookingActions, BookingState } from './booking-state';
import styles from './booking.module.css';

export function DateStrip({ state, actions }: { state: BookingState; actions: BookingActions }) {
  const strip = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    strip.current?.scrollBy({ left: direction * strip.current.clientWidth * .75 });
  }
  return <fieldset className={styles.block} id="booking-dates">
    <legend>Data</legend>
    <p className={styles.hint}>Hoje e os próximos 13 dias nesta demonstração.</p>
    <div className={styles.dateControls}>
      <button className="button button-secondary" onClick={() => scroll(-1)}>Datas anteriores</button>
      <button className="button button-secondary" onClick={() => scroll(1)}>Próximas datas</button>
    </div>
    <div className={styles.dateStrip} ref={strip}>
      {getDateWindow(new Date()).map(date => {
        const full = formatArenaDate(date);
        const short = new Intl.DateTimeFormat('pt-BR', { timeZone: ARENA_TIME_ZONE, month: 'short' })
          .format(new Date(`${date}T12:00:00Z`));
        return <label className={`${styles.choice} ${styles.day}`} key={date}>
          <input type="radio" name="date" value={date} aria-label={full}
            checked={state.draft.date === date} onChange={() => actions.setDate(date)}
            onFocus={event => event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })} />
          <span aria-hidden="true">{full.split(',')[0].replace('-feira', '')}</span>
          <strong aria-hidden="true">{Number(date.slice(-2))}</strong>
          <span aria-hidden="true">{short}</span>
        </label>;
      })}
    </div>
  </fieldset>;
}
