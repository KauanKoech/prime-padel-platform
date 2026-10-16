import { openingHours } from '../../content/arena';
import { courts, offers } from '../../content/courts';
import type { CourtId } from '../../domain/arena';
import { arenaInstant, getArenaDate, getDateWindow, isFutureSlot } from '../../domain/arena-time';
import type { AvailabilityResult, BookingConfirmation, BookingDraft } from '../../domain/booking';

export type BookingStep = 'time' | 'details' | 'review' | 'result';
export type BookingState = {
  step: BookingStep; draft: BookingDraft; availability: AvailabilityResult | null;
  loading: boolean; submitting: boolean; notice: string | null;
  nameError: string | null; confirmation: BookingConfirmation | null;
};
// Details, submission and history are completed in milestone 4.
export type BookingActions = {
  setDate(value: string): void; setCourt(value: CourtId): void; setOffer(value: string): void;
  selectSlot(id: string): void; retryAvailability(): void; goTo(step: BookingStep): void;
};

export function createDraft(now: Date, initialCourtId: string | null): BookingDraft {
  const draft: BookingDraft = { date: getArenaDate(now), courtId: null, offerId: null, slot: null, fictitiousName: '' };
  const court = courts.find(value => value.id === initialCourtId);
  return court ? changeCourt(draft, court.id) : draft;
}
export function changeDate(draft: BookingDraft, date: string): BookingDraft {
  return { ...draft, date, slot: null };
}
export function changeCourt(draft: BookingDraft, courtId: CourtId): BookingDraft {
  const courtOffers = offers.filter(offer => offer.courtId === courtId);
  return { ...draft, courtId, offerId: courtOffers.length === 1 ? courtOffers[0].id : null, slot: null };
}
export function changeOffer(draft: BookingDraft, offerId: string): BookingDraft {
  const offer = offers.find(value => value.id === offerId && value.courtId === draft.courtId);
  return { ...draft, offerId: offer?.id ?? null, slot: null };
}
export function getFirstIncompleteStep(draft: BookingDraft, now: Date): 'time' | 'details' | 'review' {
  const offer = offers.find(value => value.id === draft.offerId && value.courtId === draft.courtId);
  const { slot } = draft;
  if (!offer || !slot?.available || slot.offerId !== offer.id || slot.date !== draft.date ||
    !getDateWindow(now).includes(draft.date) || !isFutureSlot(slot, now)) return 'time';
  const hours = openingHours.find(day => day.weekday === new Date(`${draft.date}T12:00:00Z`).getUTCDay());
  if (hours?.status !== 'confirmed' ||
    Date.parse(slot.startsAt) < Date.parse(arenaInstant(draft.date, hours.opens)) ||
    Date.parse(slot.endsAt) > Date.parse(arenaInstant(draft.date, hours.closes)) ||
    Date.parse(slot.endsAt) - Date.parse(slot.startsAt) !== offer.durationMinutes * 60000) return 'time';
  return draft.fictitiousName.trim() ? 'review' : 'details';
}
