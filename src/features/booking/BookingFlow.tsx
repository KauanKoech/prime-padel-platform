'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrandLogo } from '../../components/brand/BrandPanel';
import type { BookingService } from '../../services/booking-service';
import { createBookingService } from '../../services/create-booking-service';
import { useBookingFlow } from './use-booking-flow';
import { BookingSummary } from './BookingSummary';
import { TimeStep } from './TimeStep';
import styles from './booking.module.css';

type Visit = { id: string; service: BookingService; courtId: string | null };
function ActiveBooking({ service, courtId }: Visit) {
  const { state, actions } = useBookingFlow(service, courtId);
  const title = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(state.step);
  useEffect(() => {
    if (previousStep.current !== state.step) title.current?.focus();
    previousStep.current = state.step;
  }, [state.step]);
  const isTime = state.step === 'time';
  return <>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Prime Padel — início"><BrandLogo /></Link>
        <Link href="/" className={styles.exit}>Voltar ao início</Link>
        <p className={styles.progress} aria-current="step">Etapa {isTime ? '1' : '2'} de 3 — {isTime ? 'Horário' : 'Dados'}</p>
        <ol className={styles.steps} aria-label="Etapas da demonstração">
          <li aria-current={isTime ? 'step' : undefined}>1. Horário</li>
          <li aria-current={!isTime ? 'step' : undefined}>2. Dados</li><li>3. Revisão</li>
        </ol>
      </div>
    </header>
    <main id="conteudo" tabIndex={-1} className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <p className="eyebrow">Agendamento demonstrativo</p>
          <h1 ref={title} tabIndex={-1}>{isTime ? 'Escolha seu horário' : 'Dados de demonstração'}</h1>
          <p className={styles.demo}>Demonstração: os horários são simulados. Nenhuma reserva real será feita.</p>
          <p className={styles.hint}>Ao sair ou recarregar, os dados desta demonstração são descartados.</p>
        </div>
        {state.notice && <p role="status" className={styles.notice}>{state.notice}</p>}
        {isTime ? <TimeStep state={state} actions={actions} /> :
          <section className={styles.block}>
            <p>A seleção de horário está pronta. Os dados e a revisão serão disponibilizados na próxima etapa desta demonstração.</p>
            <button className="button button-secondary" onClick={() => actions.goTo('time')}>Voltar ao horário</button>
          </section>}
      </div>
      <BookingSummary draft={state.draft}>
        {isTime && <div className={styles.continue}>
          {!state.draft.slot && <p id="continue-help">Escolha um horário para continuar</p>}
          <button className="button" disabled={!state.draft.slot || state.loading}
            aria-describedby={!state.draft.slot ? 'continue-help' : undefined}
            onClick={() => actions.goTo('details')}>Continuar</button>
        </div>}
      </BookingSummary>
    </main>
  </>;
}

export function BookingFlow() {
  const [visit, setVisit] = useState<Visit | null>(null);
  useLayoutEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (active) setVisit({ id: crypto.randomUUID(), service: createBookingService(),
        courtId: new URLSearchParams(window.location.search).get('quadra') });
    });
    // Cache Components hides routes using Activity instead of always unmounting.
    // Discard the visit on hide too, before stale selections can reappear.
    return () => { active = false; setVisit(null); };
  }, []);
  return <div className={styles.page}>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    {visit ? <ActiveBooking key={visit.id} {...visit} /> : <main id="conteudo" tabIndex={-1} className={styles.loading}>
      <h1>Agendamento demonstrativo</h1><p role="status">Preparando a seleção de horário…</p>
      <noscript>Ative o JavaScript para experimentar os horários simulados.</noscript>
      <Link href="/">Voltar ao início</Link>
    </main>}
  </div>;
}
