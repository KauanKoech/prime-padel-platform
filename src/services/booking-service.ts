import type { AvailabilityResult, BookingRequest, SubmitResult } from "../domain/booking";

export interface BookingService {
  getAvailability(input: { date: string; offerId: string }, signal?: AbortSignal): Promise<AvailabilityResult>;
  submit(input: BookingRequest, signal?: AbortSignal): Promise<SubmitResult>;
}
