import { openingHours } from "../../content/arena";
import { courts, offers } from "../../content/courts";
import type { CourtOffer } from "../../domain/arena";
import { arenaInstant, getDateWindow, isCalendarDate, isFutureSlot } from "../../domain/arena-time";
import type { AvailabilityResult, AvailabilitySlot, BookingRequest, SubmitResult } from "../../domain/booking";
import type { BookingService } from "../booking-service";
import type { TestControls } from "./scenarios";

type Options = TestControls & { now?: () => Date };
type Attempt = { fingerprint: string; pending?: Promise<SubmitResult>; success?: SubmitResult };
const invalid = { kind: "error", reason: "invalid" } as const;
const timeout = { kind: "error", reason: "timeout" } as const;
const unavailable = { kind: "error", reason: "unavailable" } as const;
const TIMEOUT_MS = 8000;

// Cancel the work itself on timeout/abort; a late callback cannot mutate the visit.
function delayed<T>(
  work: () => T, delay: number, timedOut: T, signal?: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Operation aborted", "AbortError"));
      return;
    }
    let task: ReturnType<typeof setTimeout> | undefined;
    const cleanup = () => {
      clearTimeout(deadline);
      clearTimeout(task);
      signal?.removeEventListener("abort", abort);
    };
    const abort = () => {
      cleanup();
      reject(new DOMException("Operation aborted", "AbortError"));
    };
    const deadline = setTimeout(() => { cleanup(); resolve(timedOut); }, TIMEOUT_MS);
    signal?.addEventListener("abort", abort, { once: true });
    if (Number.isFinite(delay) && delay < TIMEOUT_MS) {
      task = setTimeout(() => {
        cleanup();
        try { resolve(work()); } catch (error) { reject(error); }
      }, Math.max(0, delay));
    }
  });
}

function minutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}
function timeLabel(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function createMockBookingService(options: Options = {}): BookingService {
  const now = options.now ?? (() => new Date());
  const scenario = options.scenario ?? "normal";
  const blockedSlots = new Set<string>();
  const attempts = new Map<string, Attempt>();
  let queryIndex = 0;
  let queryFailed = false;
  let submitFailed = false;
  let conflicted = false;

  function candidates(date: string, offer: CourtOffer): AvailabilityResult {
    if (!isCalendarDate(date)) return invalid;
    const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
    const hours = openingHours.find(day => day.weekday === weekday);
    if (!hours || hours.status === "pending") return { kind: "hours-pending" };
    const slots: AvailabilitySlot[] = [];
    for (let start = minutes(hours.opens), index = 0;
      start + offer.durationMinutes <= minutes(hours.closes); start += 30, index++) {
      const label = timeLabel(start);
      const id = `${offer.id}|${date}|${label}`;
      slots.push({
        id, offerId: offer.id, date,
        startsAt: arenaInstant(date, label),
        endsAt: arenaInstant(date, timeLabel(start + offer.durationMinutes)),
        available: scenario !== "all-unavailable" && index % 4 !== 3 && !blockedSlots.has(id),
      });
    }
    return { kind: "ready", slots };
  }

  function availability(date: string, offerId: string): AvailabilityResult {
    const offer = offers.find(value => value.id === offerId);
    const instant = now();
    if (!offer || !getDateWindow(instant).includes(date)) return invalid;
    const result = candidates(date, offer);
    if (result.kind !== "ready") return result;
    return {
      kind: "ready",
      slots: scenario === "empty" ? [] : result.slots.filter(slot => isFutureSlot(slot, instant)),
    };
  }

  function submitValidated(input: BookingRequest): SubmitResult {
    const offer = offers.find(value => value.id === input.offerId);
    if (!offer) return invalid;
    const [slotOfferId, date] = input.slotId.split("|");
    if (slotOfferId !== offer.id || !isCalendarDate(date ?? "")) return invalid;
    const result = candidates(date, offer);
    if (result.kind !== "ready") return invalid;
    const slot = result.slots.find(value => value.id === input.slotId);
    if (!slot) return invalid;
    const instant = now();
    if (!isFutureSlot(slot, instant)) return { kind: "expired" };
    if (!getDateWindow(instant).includes(date)) return invalid;
    if (scenario === "submit-error-once" && !submitFailed) {
      submitFailed = true;
      return unavailable;
    }
    if (scenario === "empty" || !slot.available) return { kind: "conflict" };
    if (scenario === "conflict-once" && !conflicted) {
      conflicted = true;
      blockedSlots.add(slot.id);
      return { kind: "conflict" };
    }
    return {
      kind: "success",
      confirmation: {
        simulated: true, court: { ...courts.find(court => court.id === offer.courtId)! },
        offer: { ...offer }, slot, fictitiousName: input.fictitiousName,
      },
    };
  }

  return {
    getAvailability(input, signal) {
      const delay = options.queryDelaysMs?.[queryIndex++] ?? options.queryDelayMs ?? 250;
      return delayed<AvailabilityResult>(() => {
        if (scenario === "query-error-once" && !queryFailed) {
          queryFailed = true;
          return unavailable;
        }
        return availability(input.date, input.offerId);
      }, scenario === "query-timeout" ? Infinity : delay, timeout, signal);
    },
    submit(input, signal) {
      if (signal?.aborted) return Promise.reject(new DOMException("Operation aborted", "AbortError"));
      const name = input.fictitiousName.trim();
      if (!name || !input.attemptId.trim()) return Promise.resolve(invalid);
      const normalized = { ...input, fictitiousName: name };
      const fingerprint = JSON.stringify([input.offerId, input.slotId, name]);
      const existing = attempts.get(input.attemptId);
      if (existing && existing.fingerprint !== fingerprint) return Promise.resolve(invalid);
      if (existing?.success) return Promise.resolve(existing.success);
      if (existing?.pending) return existing.pending;
      const attempt: Attempt = existing ?? { fingerprint };
      attempts.set(input.attemptId, attempt);
      const pending = delayed<SubmitResult>(
        () => submitValidated(normalized),
        scenario === "submit-timeout" ? Infinity : options.submitDelayMs ?? 250,
        timeout, signal,
      ).then(result => {
        if (result.kind === "success") attempt.success = result;
        return result;
      }).finally(() => { attempt.pending = undefined; });
      attempt.pending = pending;
      return pending;
    },
  };
}
