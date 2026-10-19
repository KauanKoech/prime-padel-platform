import type { BookingService } from '../domain/booking';
import { createMockBookingService } from './mock-booking';

export { demoConfig } from './booking-demo';

/**
 * Ponto único de composição do agendamento. Quando a API existir, troque por um adaptador HTTP
 * que implemente `BookingService`; as telas não mudam.
 */
export const bookingService: BookingService = createMockBookingService();
