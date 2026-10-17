/**
 * Contratos do agendamento. A interface conversa só com estes tipos e com o `BookingService`;
 * o mock de hoje e a API de amanhã implementam o mesmo contrato.
 */
export type CourtId = string;

/** Uma oferta: combinação de quadra + duração com preço próprio (preço por quadra, não por pessoa). */
export interface CourtOffer {
  durationMinutes: number;
  priceCents: number;
}

export interface Court {
  id: CourtId;
  name: string;
  offers: readonly CourtOffer[];
}

/** Dia da semana no padrão de Date#getDay (0 = domingo). */
export interface OpeningHours {
  day: number;
  label: string;
  open: string;
  close: string;
  /** Horário informado, mas ainda não confirmado pela arena. */
  pending?: boolean;
}

export interface AvailabilityQuery {
  /** AAAA-MM-DD no fuso da arena. */
  date: string;
  courtId: CourtId;
  durationMinutes: number;
}

export interface AvailabilitySlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
}

export interface Availability {
  source: 'mock' | 'api';
  slots: AvailabilitySlot[];
}

export interface PlayerDetails {
  name: string;
  phone: string;
  notes: string;
}

export interface BookingRequest extends AvailabilityQuery {
  slotId: string;
  player: PlayerDetails;
}

/** Resposta da solicitação. Na fase atual é sempre demonstrativa: nada é persistido. */
export interface BookingConfirmation {
  mode: 'demo';
  persisted: false;
  request: BookingRequest;
}

export type BookingErrorCode = 'INVALID_QUERY' | 'INVALID_PLAYER' | 'SLOT_UNAVAILABLE' | 'SLOT_CONFLICT' | 'TEMPORARY_FAILURE';

export class BookingError extends Error {
  code: BookingErrorCode;
  constructor(code: BookingErrorCode) {
    super(code);
    this.name = 'BookingError';
    this.code = code;
  }
}

export interface BookingService {
  getAvailability(query: AvailabilityQuery, signal?: AbortSignal): Promise<Availability>;
  requestBooking(request: BookingRequest, signal?: AbortSignal): Promise<BookingConfirmation>;
}
