'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getArenaDate, getDateWindow, isFutureSlot } from '../../domain/arena-time';
import type { BookingDraft } from '../../domain/booking';
import type { BookingService } from '../../services/booking-service';
import { changeCourt, changeDate, changeOffer, createDraft, getFirstIncompleteStep, validateFictitiousName,
  type BookingActions, type BookingState, type BookingStep } from './booking-state';
import { useBookingHistory } from './use-booking-history';

const expiredNotice = 'Esse horário já passou. Escolha outro para continuar.';
const nameError = 'Informe um nome fictício para continuar.';
export function useBookingFlow(service: BookingService, initialCourtId: string | null, restartVisit: () => void): {
  state: BookingState; actions: BookingActions;
} {
  const [state, setState] = useState<BookingState>(() => {
    const draft = createDraft(new Date(), initialCourtId);
    return { step: 'time', draft, availability: null, loading: Boolean(draft.offerId),
      submitting: false, notice: null, nameError: null, confirmation: null, focus: null };
  });
  const current = useRef(state);
  const sequence = useRef(0);
  const request = useRef<AbortController | null>(null);
  const submission = useRef<AbortController | null>(null);
  const attempt = useRef<{ id: string; fingerprint: string } | null>(null);
  const [revision, setRevision] = useState(0);
  const commit = useCallback((next: BookingState) => {
    current.current = next;
    setState(next);
  }, []);
  const focusState = useCallback((next: BookingState, target: 'title' | 'name' | 'notice'): BookingState =>
    ({ ...next, focus: { target, serial: (current.current.focus?.serial ?? 0) + 1 } }), []);
  const cancelQuery = useCallback(() => {
    sequence.current++;
    request.current?.abort();
  }, []);
  const history = useBookingHistory({ step: state.step, onNavigate: step => navigate(step, true) });

  const refreshDraft = useCallback((draft: BookingDraft): { draft: BookingDraft; expired: boolean } => {
    const now = new Date();
    if (!getDateWindow(now).includes(draft.date)) return { draft: changeDate(draft, getArenaDate(now)), expired: true };
    if (draft.slot && !isFutureSlot(draft.slot, now)) return { draft: { ...draft, slot: null }, expired: true };
    return { draft, expired: false };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const id = ++sequence.current;
    request.current = controller;
    const active = () => !controller.signal.aborted && sequence.current === id;
    async function query() {
      if (state.step !== 'time' || !active()) return;
      const checked = refreshDraft(current.current.draft);
      if (checked.expired) {
        commit(focusState({ ...current.current, draft: checked.draft, notice: expiredNotice,
          availability: null, loading: Boolean(checked.draft.offerId), step: 'time' }, 'notice'));
        if (checked.draft.date !== state.draft.date) return;
      }
      const { date, offerId } = checked.draft;
      if (new Date(date + 'T12:00:00Z').getUTCDay() === 3) {
        commit({ ...current.current, availability: { kind: 'hours-pending' }, loading: false });
        return;
      }
      if (!offerId) {
        commit({ ...current.current, availability: null, loading: false });
        return;
      }
      commit({ ...current.current, availability: null, loading: true });
      try {
        const result = await service.getAvailability({ date, offerId }, controller.signal);
        if (!active()) return;
        const fresh = refreshDraft(current.current.draft);
        if (fresh.expired) {
          commit(focusState({ ...current.current, draft: fresh.draft, notice: expiredNotice,
            availability: null, loading: Boolean(fresh.draft.offerId), step: 'time' }, 'notice'));
          setRevision(value => value + 1);
          return;
        }
        const slot = current.current.draft.slot;
        const stillAvailable = result.kind === 'ready' && result.slots.some(value => value.id === slot?.id && value.available);
        commit({ ...current.current, availability: result, loading: false,
          draft: slot && !stillAvailable ? { ...current.current.draft, slot: null } : current.current.draft });
      } catch {
        if (active()) commit({ ...current.current, availability: { kind: 'error', reason: 'unavailable' }, loading: false });
      }
    }
    void Promise.resolve().then(query);
    return () => controller.abort();
  }, [state.step, state.draft.date, state.draft.offerId, revision, service, commit, refreshDraft, focusState]);

  useEffect(() => {
    const cancel = () => { cancelQuery(); submission.current?.abort(); };
    window.addEventListener('pagehide', cancel);
    return () => { window.removeEventListener('pagehide', cancel); cancel(); };
  }, [cancelQuery]);

  function recoverTime(draft: BookingDraft, notice: string) {
    cancelQuery();
    commit(focusState({ ...current.current, draft: { ...draft, slot: null }, step: 'time',
      availability: null, loading: Boolean(draft.offerId), submitting: false, notice }, 'notice'));
    history.replaceStep('time');
    setRevision(value => value + 1);
  }
  function navigate(requested: BookingStep, fromHistory = false) {
    const value = current.current;
    if (value.confirmation) {
      history.replaceStep('result');
      commit(focusState({ ...value, step: 'result' }, 'title'));
      return;
    }
    if (submission.current || value.submitting) { history.replaceStep('review'); return; }
    const checked = refreshDraft(value.draft);
    if (checked.expired) { recoverTime(checked.draft, expiredNotice); return; }
    let draft = checked.draft;
    const firstIncomplete = getFirstIncompleteStep(draft, new Date());
    let next = requested;
    let error: string | null = null;
    let notice = value.notice;
    if (requested !== 'time' && firstIncomplete === 'time') {
      next = 'time'; notice = 'Escolha um horário para continuar.';
    } else if (requested === 'review' || requested === 'result') {
      const name = validateFictitiousName(draft.fictitiousName);
      if (!name.valid) { next = 'details'; error = nameError; }
      else { next = 'review'; draft = { ...draft, fictitiousName: name.value }; }
    }
    if (next !== 'time') cancelQuery();
    const target = error ? 'name' : next === 'time' && next !== requested ? 'notice' : 'title';
    if (fromHistory || next !== requested) history.replaceStep(next);
    else if (next !== value.step) history.pushStep(next);
    commit(focusState({ ...value, draft, step: next, nameError: error, notice, loading: false }, target));
  }
  function changeFilters(draft: BookingDraft) {
    if (submission.current || current.current.confirmation) return;
    cancelQuery();
    const checked = refreshDraft(draft);
    commit({ ...current.current, draft: checked.draft, step: 'time', availability: null,
      loading: Boolean(checked.draft.offerId), notice: checked.expired ? expiredNotice : current.current.notice, nameError: null });
    setRevision(value => value + 1);
  }
  const actions: BookingActions = {
    setDate: value => changeFilters(changeDate(current.current.draft, value)),
    setCourt: value => changeFilters(changeCourt(current.current.draft, value)),
    setOffer: value => changeFilters(changeOffer(current.current.draft, value)),
    retryAvailability: () => changeFilters({ ...current.current.draft, slot: null }),
    selectSlot(id) {
      const value = current.current;
      if (submission.current || value.confirmation || value.loading || value.availability?.kind !== 'ready') return;
      const slot = value.availability.slots.find(slot => slot.id === id && slot.available);
      if (!slot) return;
      const draft = { ...value.draft, slot };
      if (getFirstIncompleteStep(draft, new Date()) === 'time') { recoverTime(refreshDraft(draft).draft, expiredNotice); return; }
      commit({ ...value, draft, notice: null });
    },
    goTo: navigate,
    setName(value) {
      if (submission.current || current.current.confirmation) return;
      commit({ ...current.current, draft: { ...current.current.draft, fictitiousName: value } });
    },
    validateName() {
      const name = validateFictitiousName(current.current.draft.fictitiousName);
      commit({ ...current.current, nameError: name.valid ? null : nameError,
        draft: name.valid ? { ...current.current.draft, fictitiousName: name.value } : current.current.draft });
      return name.valid;
    },
    async submit() {
      if (submission.current || current.current.confirmation) return;
      navigate('review', true);
      const value = current.current;
      if (value.step !== 'review' || getFirstIncompleteStep(value.draft, new Date()) !== 'review') return;
      const { offerId, slot, fictitiousName } = value.draft;
      const fingerprint = JSON.stringify([offerId, slot!.id, fictitiousName]);
      if (attempt.current?.fingerprint !== fingerprint) attempt.current = { id: crypto.randomUUID(), fingerprint };
      const controller = new AbortController();
      submission.current = controller; // Lock before React renders disabled controls.
      cancelQuery();
      commit({ ...current.current, submitting: true, notice: null });
      try {
        const result = await service.submit({ attemptId: attempt.current.id, offerId: offerId!, slotId: slot!.id, fictitiousName }, controller.signal);
        if (controller.signal.aborted) return;
        if (result.kind === 'success') {
          commit(focusState({ ...current.current, step: 'result', confirmation: result.confirmation, submitting: false, notice: null }, 'title'));
          history.replaceStep('result');
        } else if (result.kind === 'conflict' || result.kind === 'expired') {
          const fresh = refreshDraft(current.current.draft);
          recoverTime(fresh.draft, fresh.expired || result.kind === 'expired' ? expiredNotice :
            'Na simulação, esse horário ficou indisponível. Escolha outro.');
        } else {
          commit(focusState({ ...current.current, submitting: false,
            notice: 'Não foi possível concluir a simulação. Tente novamente.' }, 'notice'));
        }
      } catch {
        if (!controller.signal.aborted) commit(focusState({ ...current.current, submitting: false,
          notice: 'Não foi possível concluir a simulação. Tente novamente.' }, 'notice'));
      } finally {
        if (submission.current === controller) submission.current = null;
      }
    },
    restart() {
      if (submission.current) return;
      cancelQuery();
      restartVisit();
    },
  };
  return { state, actions };
}
