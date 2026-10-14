export type CourtId = string;
export interface CourtRate { durationMinutes: number; priceCents: number }
export interface Court { id: CourtId; name: string; rates: CourtRate[] }
export interface AvailabilityQuery { date: string; courtId: CourtId; durationMinutes: number }
export interface TimeSlotData { id: string; start: string; end: string; available: boolean }
export interface Availability { source: 'mock' | 'api'; slots: TimeSlotData[] }
export interface PlayerDetails { name: string; phone: string; notes: string }
export interface BookingRequest extends AvailabilityQuery { slotId: string; player: PlayerDetails }
export interface DemoReceipt { mode: 'demo'; persisted: false; request: BookingRequest }
export interface BookingService {
 getAvailability(query: AvailabilityQuery, signal?: AbortSignal): Promise<Availability>;
 submitDemo(request: BookingRequest, signal?: AbortSignal): Promise<DemoReceipt>;
}

