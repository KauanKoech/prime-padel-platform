'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BrandLogo } from '../../components/brand/BrandPanel';
import type { BookingService } from '../../services/booking-service';
import { createBookingService } from '../../services/create-booking-service';
import { useBookingFlow } from './use-booking-flow';
import { BookingSummary } from './BookingSummary';
import { TimeStep } from './TimeStep';
import { DetailsStep } from './DetailsStep';
import { ReviewStep } from './ReviewStep';
import { ResultStep } from './ResultStep';
import styles from './booking.module.css';

type Visit = { id: string; service: BookingService; courtId: string | null };
function ActiveBooking({ service, courtId, restart }: Visit & { restart: () => void }) {
  const { state, actions } = useBookingFlow(service, courtId, restart);
  const title = useRef<HTMLHeadingElement>(null);
  const notice = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (state.focus?.target === 'name') document.getElementById('fictitious-name')?.focus();
    else if (state.focus?.target === 'notice') notice.current?.focus();
    else if (state.focus?.target === 'title') title.current?.focus();
  }, [state.focus]);
  const isTime = state.step === 'time';
  const isResult = state.step === 'result';
  const titles = { time: 'Escolha seu horário', details: 'Dados de demonstração', review: 'Revise a simulação', result: 'Solicitação simulada concluída' };
  const number = isTime ? 1 : state.step === 'details' ? 2 : 3;
  return <>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Prime Padel — início"><BrandLogo /></Link>
        {!isResult && <Link href="/" className={styles.exit}>Voltar ao início</Link>}
        <p className={styles.progress}>{isResult ? 'Demonstração concluída' : `Etapa ${number} de 3 — ${isTime ? 'Horário' : state.step === 'details' ? 'Dados' : 'Revisão'}`}</p>
        {!isResult && <ol className={styles.steps} aria-label="Etapas da demonstração">
          <li aria-current={isTime ? 'step' : undefined}>1. Horário</li>
          <li aria-current={state.step === 'details' ? 'step' : undefined}>2. Dados</li>
          <li aria-current={state.step === 'review' ? 'step' : undefined}>3. Revisão</li>
        </ol>}
      </div>
    </header>
    <main id="conteudo" tabIndex={-1} className={`${styles.layout} ${isResult ? styles.resultLayout : ''}`}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <p className="eyebrow">Agendamento demonstrativo</p>
          <h1 ref={title} tabIndex={-1}>{titles[state.step]}</h1>
          <p className={styles.demo}>Demonstração: os horários são simulados. Nenhuma reserva real será feita.</p>
          <p className={styles.hint}>Ao sair ou recarregar, os dados desta demonstração são descartados.</p>
        </div>
        {state.notice && <p ref={notice} tabIndex={-1} className={state.step === 'review' ? styles.error : styles.notice}>{state.notice}</p>}
        {isTime && <TimeStep state={state} actions={actions} />}
        {state.step === 'details' && <DetailsStep state={state} actions={actions} />}
        {state.step === 'review' && <ReviewStep state={state} actions={actions} />}
        {isResult && <ResultStep state={state} actions={actions} />}
      </div>
      {!isResult && <BookingSummary draft={state.draft}>
        {isTime && <div className={styles.continue}>
          {!state.draft.slot && <p id="continue-help">Escolha um horário para continuar</p>}
          <button className="button" disabled={!state.draft.slot || state.loading}
            aria-describedby={!state.draft.slot ? 'continue-help' : undefined}
            onClick={() => actions.goTo('details')}>Continuar</button>
        </div>}
        {state.step === 'details' && <div className={styles.continue}>
          <button type="submit" form="booking-details" className="button">Revisar simulação</button>
        </div>}
        {state.step === 'review' && <div className={styles.continue}>
          <p role="status">{state.submitting ? 'Simulando solicitação…' : ''}</p>
          <button className="button" aria-busy={state.submitting} disabled={state.submitting}
            onClick={() => void actions.submit()}>{state.submitting ? 'Simulando solicitação…' : 'Simular solicitação'}</button>
        </div>}
      </BookingSummary>}
    </main>
  </>;
}

export function BookingFlow() {
  const [visit, setVisit] = useState<Visit | null>(null);
  useLayoutEffect(() => {
    let active = true;
    let visible = true;
    function start(courtId: string | null) {
      void Promise.resolve().then(() => {
        if (active && visible) setVisit({ id: crypto.randomUUID(), service: createBookingService(), courtId });
      });
    }
    start(new URLSearchParams(window.location.search).get('quadra'));
    const hide = () => { visible = false; flushSync(() => setVisit(null)); };
    const show = (event: PageTransitionEvent) => { if (event.persisted) { visible = true; start(null); } };
    window.addEventListener('pagehide', hide);
    window.addEventListener('pageshow', show);
    // Clear before Activity hiding or document freezing; never restore a personal draft.
    return () => {
      active = false; setVisit(null);
      window.removeEventListener('pagehide', hide); window.removeEventListener('pageshow', show);
    };
  }, []);
  return <div className={styles.page}>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    {visit ? <ActiveBooking key={visit.id} {...visit} restart={() => setVisit({
      id: crypto.randomUUID(), service: createBookingService(), courtId: null,
    })} /> : <main id="conteudo" tabIndex={-1} className={styles.loading}>
      <h1>Agendamento demonstrativo</h1><p role="status">Preparando a seleção de horário…</p>
      <noscript>Ative o JavaScript para experimentar os horários simulados.</noscript>
      <Link href="/">Voltar ao início</Link>
    </main>}
  </div>;
}
