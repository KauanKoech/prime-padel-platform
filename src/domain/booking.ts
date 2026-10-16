import type { Court, CourtId, CourtOffer } from "./arena";

export type BookingDraft = {
  date: string;
  courtId: CourtId | null;
  offerId: string | null;
  slot: AvailabilitySlot | null;
  fictitiousName: string;
};

export type AvailabilitySlot = {
  id: string;
  offerId: string;
  date: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
};
export type AvailabilityResult =
  | { kind: "ready"; slots: readonly AvailabilitySlot[] }
  | { kind: "hours-pending" }
  | { kind: "error"; reason: "timeout" | "unavailable" | "invalid" };
export type BookingRequest = {
  attemptId: string;
  offerId: string;
  slotId: string;
  fictitiousName: string;
};
export type BookingConfirmation = {
  simulated: true;
  court: Court;
  offer: CourtOffer;
  slot: AvailabilitySlot;
  fictitiousName: string;
};
export type SubmitResult =
  | { kind: "success"; confirmation: BookingConfirmation }
  | { kind: "conflict" }
  | { kind: "expired" }
  | { kind: "error"; reason: "timeout" | "unavailable" | "invalid" };
