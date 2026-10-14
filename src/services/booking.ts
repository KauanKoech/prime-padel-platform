import { createMockBookingService } from './mock-booking';
import type { BookingService } from '../domain/booking';
// Ponto único de composição. Substituir por adaptador HTTP quando a API existir.
export const bookingService:BookingService=createMockBookingService();
