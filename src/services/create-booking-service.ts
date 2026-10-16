import type { BookingService } from './booking-service';
import { createMockBookingService } from './mock/booking-service';
import type { TestControls } from './mock/scenarios';

declare global {
  interface Window { __PRIME_PADEL_TEST__?: TestControls }
}

// The only composition point for the adapter; screens depend on BookingService.
export function createBookingService(): BookingService {
  const controls = process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_ENABLE_TEST_HARNESS === '1' && typeof window !== 'undefined'
    ? window.__PRIME_PADEL_TEST__ : undefined;
  return createMockBookingService(controls);
}
