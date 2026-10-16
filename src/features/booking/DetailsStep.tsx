import type { BookingActions, BookingState } from './booking-state';
import styles from './booking.module.css';

export function DetailsStep({ state, actions }: { state: BookingState; actions: BookingActions }) {
  return <form id="booking-details" className={styles.block} noValidate onSubmit={event => {
    event.preventDefault(); actions.goTo('review');
  }}>
    <h2>Como podemos chamar você?</h2>
    <p>Use apenas dados fictícios.</p>
    <div className={styles.field}>
      <label htmlFor="fictitious-name">Nome fictício <span>(obrigatório)</span></label>
      <input id="fictitious-name" type="text" autoComplete="off" spellCheck={false} required
        value={state.draft.fictitiousName} aria-invalid={Boolean(state.nameError)}
        aria-describedby={`name-help${state.nameError ? ' name-error' : ''}`}
        onChange={event => actions.setName(event.target.value)} onBlur={() => actions.validateName()} />
      <p id="name-help" className={styles.hint}>Exemplo: Jogador de teste</p>
      {state.nameError && <p id="name-error" className={styles.fieldError}>{state.nameError}</p>}
    </div>
    <button type="button" className="button button-secondary" onClick={() => actions.goTo('time')}>Voltar ao horário</button>
  </form>;
}
