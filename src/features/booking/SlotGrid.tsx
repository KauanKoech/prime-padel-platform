import { formatArenaTime } from '../../domain/format';
import type { BookingActions, BookingState } from './booking-state';
import styles from './booking.module.css';

export function SlotGrid({ state, actions }: { state: BookingState; actions: BookingActions }) {
  const result = state.availability;
  const empty = result?.kind === 'ready' && !result.slots.some(slot => slot.available);
  let message = !state.draft.courtId ? 'Escolha uma quadra para continuar' : 'Escolha uma duração para consultar os horários.';
  if (state.loading) message = 'Carregando horários simulados…';
  else if (result?.kind === 'hours-pending') message = 'O horário de quarta-feira ainda precisa de confirmação.';
  else if (result?.kind === 'error') message = 'Não foi possível carregar os horários simulados.';
  else if (empty) message = 'Nenhum horário disponível na simulação para esta combinação.';
  else if (result?.kind === 'ready') message = 'Horários simulados disponíveis para seleção.';
  return <section className={styles.block} aria-labelledby="slots-heading" aria-busy={state.loading}>
    <h2 id="slots-heading">Horários</h2>
    <p className={styles.hint}>Horários da arena — America/Sao_Paulo</p>
    <p role="status" className={result?.kind === 'error' ? styles.error : styles.status}>{message}</p>
    {!state.loading && result?.kind === 'hours-pending' &&
      <button className="button button-secondary" onClick={() => {
        document.querySelector<HTMLInputElement>('#booking-dates input:checked')?.focus();
      }}>Escolher outra data</button>}
    {!state.loading && result?.kind === 'error' &&
      <button className="button button-secondary" onClick={actions.retryAvailability}>Tentar novamente</button>}
    {!state.loading && result?.kind === 'ready' && result.slots.length > 0 &&
      <fieldset className={styles.slotGroup}>
        <legend className={styles.srOnly}>Horários simulados</legend>
        <div className={styles.slotGrid}>{result.slots.map(slot => {
          const selected = state.draft.slot?.id === slot.id;
          const label = selected ? 'Selecionado' : slot.available ? 'Disponível' : 'Indisponível';
          const start = formatArenaTime(slot.startsAt), end = formatArenaTime(slot.endsAt);
          return <label key={slot.id} className={`${styles.choice} ${styles.slot}`}>
            <input type="radio" name="slot" checked={selected} disabled={!slot.available}
              aria-label={`${start} até ${end} — ${label}`} onChange={() => actions.selectSlot(slot.id)} />
            <strong aria-hidden="true">{start} até {end}</strong><span aria-hidden="true">{label}</span>
          </label>;
        })}</div>
      </fieldset>}
  </section>;
}
