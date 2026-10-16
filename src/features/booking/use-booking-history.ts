'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import type { BookingStep } from './booking-state';

const steps: readonly string[] = ['time', 'details', 'review', 'result'];
export function useBookingHistory({ step, onNavigate }: {
  step: BookingStep; onNavigate: (step: BookingStep) => void;
}): { pushStep: (step: BookingStep) => void; replaceStep: (step: BookingStep) => void } {
  const visitId = useRef('');
  const navigate = useRef(onNavigate);
  useLayoutEffect(() => { navigate.current = onNavigate; }, [onNavigate]);
  const write = useCallback((next: BookingStep, push: boolean) => {
    if (!visitId.current) return;
    const previous = window.history.state;
    const current = previous?.primePadel;
    if (current?.visitId === visitId.current && current?.step === next) return;
    const state = { ...previous, primePadel: { visitId: visitId.current, step: next } };
    if (push) window.history.pushState(state, '', window.location.href);
    else window.history.replaceState(state, '', window.location.href);
  }, []);
  const pushStep = useCallback((next: BookingStep) => write(next, true), [write]);
  const replaceStep = useCallback((next: BookingStep) => write(next, false), [write]);

  useLayoutEffect(() => {
    visitId.current = crypto.randomUUID();
    replaceStep('time');
    function pop(event: PopStateEvent) {
      if (window.location.pathname !== '/agendamento') return;
      const entry = event.state?.primePadel;
      const valid = entry?.visitId === visitId.current && steps.includes(entry?.step);
      navigate.current(valid ? entry.step : 'time');
    }
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, [replaceStep]);
  // Automatic corrections, conflict and success replace the current entry.
  // Explicit navigation calls pushStep before the next render.
  useLayoutEffect(() => { replaceStep(step); }, [step, replaceStep]);
  return { pushStep, replaceStep };
}
