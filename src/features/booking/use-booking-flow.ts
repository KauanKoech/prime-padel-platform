'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getArenaDate, getDateWindow, isFutureSlot } from '../../domain/arena-time';
import type { BookingDraft } from '../../domain/booking';
import type { BookingService } from '../../services/booking-service';
import { changeCourt, changeDate, changeOffer, createDraft, getFirstIncompleteStep,
  type BookingActions, type BookingState } from './booking-state';

const expiredNotice = 'Esse horário já passou. Escolha outro para continuar.';
export function useBookingFlow(service: BookingService, initialCourtId: string | null): {
  state: BookingState; actions: BookingActions;
} {
  const [state, setState] = useState<BookingState>(() => {
    const draft = createDraft(new Date(), initialCourtId);
    return { step: 'time', draft, availability: null, loading: Boolean(draft.offerId),
      submitting: false, notice: null, nameError: null, confirmation: null };
  });
  const current = useRef(state);
  const sequence = useRef(0);
  const request = useRef<AbortController | null>(null);
  const [revision, setRevision] = useState(0);
  const commit = useCallback((next: BookingState) => {
    current.current = next;
    setState(next);
  }, []);
  const cancelQuery = useCallback(() => {
    sequence.current++;
    request.current?.abort();
  }, []);

  // Revalidate at action time, not using a date captured when the module loaded.
  const refreshDraft = useCallback((draft: BookingDraft): { draft: BookingDraft; expired: boolean } => {
    const now = new Date();
    if (!getDateWindow(now).includes(draft.date)) {
      return { draft: changeDate(draft, getArenaDate(now)), expired: true };
    }
    if (draft.slot && !isFutureSlot(draft.slot, now)) return { draft: { ...draft, slot: null }, expired: true };
    return { draft, expired: false };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const id = ++sequence.current;
    request.current = controller;
    const active = () => !controller.signal.aborted && sequence.current === id;
    async function query() {
      const checked = refreshDraft(current.current.draft);
      if (!active()) return;
      if (checked.expired) {
        commit({ ...current.current, draft: checked.draft, notice: expiredNotice,
          availability: null, loading: Boolean(checked.draft.offerId), step: 'time' });
        // Changing the date starts a new effect; same-date expiry can use this query.
        if (checked.draft.date !== state.draft.date) return;
      }
      const { date, offerId } = checked.draft;
      if (new Date(`${date}T12:00:00Z`).getUTCDay() === 3) {
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
          commit({ ...current.current, draft: fresh.draft, notice: expiredNotice, availability: null,
            loading: Boolean(fresh.draft.offerId), step: 'time' });
          setRevision(value => value + 1);
          return;
        }
        commit({ ...current.current, availability: result, loading: false });
      } catch {
        if (active()) commit({ ...current.current, availability: { kind: 'error', reason: 'unavailable' }, loading: false });
      }
    }
    // Initialization also uses this path; defer to avoid synchronous effect updates.
    void Promise.resolve().then(query);
    return () => controller.abort();
  }, [state.draft.date, state.draft.offerId, revision, service, commit, refreshDraft]);

  function changeFilters(draft: BookingDraft) {
    cancelQuery();
    const checked = refreshDraft(draft);
    commit({ ...current.current, draft: checked.draft, step: 'time', availability: null,
      loading: Boolean(checked.draft.offerId), notice: checked.expired ? expiredNotice : null, nameError: null });
    setRevision(value => value + 1);
  }
  const actions: BookingActions = {
    setDate: value => changeFilters(changeDate(current.current.draft, value)),
    setCourt: value => changeFilters(changeCourt(current.current.draft, value)),
    setOffer: value => changeFilters(changeOffer(current.current.draft, value)),
    retryAvailability: () => changeFilters({ ...current.current.draft, slot: null }),
    selectSlot(id) {
      const value = current.current;
      if (value.loading || value.availability?.kind !== 'ready') return;
      const slot = value.availability.slots.find(slot => slot.id === id && slot.available);
      if (!slot) return;
      const draft = { ...value.draft, slot };
      if (getFirstIncompleteStep(draft, new Date()) === 'time') {
        changeFilters(draft);
        return;
      }
      commit({ ...value, draft, notice: null });
    },
    goTo(step) {
      const checked = refreshDraft(current.current.draft);
      const incomplete = getFirstIncompleteStep(checked.draft, new Date());
      if (checked.expired) {
        cancelQuery();
        commit({ ...current.current, draft: checked.draft, step: 'time', notice: expiredNotice,
          availability: null, loading: Boolean(checked.draft.offerId) });
        setRevision(value => value + 1);
        return;
      }
      // Only time and the details handoff are exposed in this milestone.
      commit({ ...current.current, step: step === 'time' || incomplete === 'time' ? 'time' : 'details' });
    },
  };
  return { state, actions };
}
