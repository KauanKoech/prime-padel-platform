import Link from 'next/link';
import type { BookingActions, BookingState } from './booking-state';
import { BookingDetails } from './ReviewStep';
import styles from './booking.module.css';

export function ResultStep({ state, actions }: { state: BookingState; actions: BookingActions }) {
  if (!state.confirmation) return null;
  return <section className={styles.resultPanel} aria-label="Resultado da simulação">
    <h2>Uma experiência de demonstração</h2>
    <p>Esta demonstração não enviou uma solicitação à arena e não reservou a quadra.</p>
    <BookingDetails details={state.confirmation} />
    <button className="button button-light" onClick={actions.restart}>Simular outro horário</button>
    <Link href="/" className={styles.resultLink}>Voltar ao início</Link>
  </section>;
}
