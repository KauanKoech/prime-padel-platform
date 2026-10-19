import { arena } from '../content/arena';
import { BookingError, type AvailabilityQuery, type AvailabilitySlot, type BookingService } from '../domain/booking';
import { isPlayerValid } from '../domain/validation';
import { addDays, localDate, localTime, toClock, toMinutes, weekday } from '../lib/format';
import { demoConfig } from './booking-demo';

/** Valida a consulta: data dentro do horizonte, quadra existente e duração oferecida por ela. */
export function validateQuery(query: AvailabilityQuery, now = new Date()) {
  const today = localDate(now);
  const court = arena.courts.find((c) => c.id === query.courtId);
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(query.date) && !Number.isNaN(Date.parse(`${query.date}T12:00:00Z`));
  if (!validDate || query.date < today || query.date > addDays(today, demoConfig.horizonDays - 1) || !court?.offers.some((o) => o.durationMinutes === query.durationMinutes)) {
    throw new BookingError('INVALID_QUERY');
  }
  return court;
}

/** Gera a grade do dia a partir do horário de funcionamento, em blocos da duração escolhida. */
export function generateSlots(query: AvailabilityQuery, now = new Date(), taken: ReadonlySet<string> = new Set()): AvailabilitySlot[] {
  validateQuery(query, now);
  const today = localDate(now);
  if (query.date === addDays(today, demoConfig.emptyDayOffset)) return [];
  const hours = arena.hours.find((h) => h.day === weekday(query.date));
  if (!hours) return [];
  const courtIndex = arena.courts.findIndex((c) => c.id === query.courtId);
  const current = toMinutes(localTime(now));
  const slots: AvailabilitySlot[] = [];
  const close = toMinutes(hours.close);
  for (let start = toMinutes(hours.open), i = 0; start + query.durationMinutes <= close; start += query.durationMinutes, i++) {
    if (query.date === today && start <= current) continue;
    const id = [query.date, query.courtId, query.durationMinutes, toClock(start)].join('/');
    slots.push({
      id,
      start: toClock(start),
      end: toClock(start + query.durationMinutes),
      available: (i + courtIndex) % demoConfig.unavailableEvery !== 2 && !taken.has(id),
    });
  }
  return slots;
}

function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Operação cancelada', 'AbortError'));
    };
    if (signal?.aborted) return abort();
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', abort, { once: true });
  });
}

/**
 * Serviço simulado. Relógio, latência e cenários são injetáveis para testes determinísticos.
 * Não envia, não grava e não registra dados pessoais.
 */
export function createMockBookingService({
  now = () => new Date(),
  latencyMs = demoConfig.latencyMs,
  scenarios = true,
}: { now?: () => Date; latencyMs?: number; scenarios?: boolean } = {}): BookingService {
  const failedOnce = new Set<string>();
  const conflicted = new Set<string>();
  const conflictDays = new Set<string>();

  return {
    async getAvailability(query, signal) {
      await wait(latencyMs, signal);
      validateQuery(query, now());
      const key = JSON.stringify(query);
      if (scenarios && query.date === addDays(localDate(now()), demoConfig.failingDayOffset) && !failedOnce.has(key)) {
        failedOnce.add(key);
        throw new BookingError('TEMPORARY_FAILURE');
      }
      return { source: 'mock', slots: generateSlots(query, now(), conflicted) };
    },

    async requestBooking(request, signal) {
      await wait(latencyMs, signal);
      if (!isPlayerValid(request.player)) throw new BookingError('INVALID_PLAYER');
      const slot = generateSlots(request, now(), conflicted).find((s) => s.id === request.slotId);
      if (!slot?.available) throw new BookingError('SLOT_UNAVAILABLE');
      if (scenarios && request.date === addDays(localDate(now()), demoConfig.conflictDayOffset) && !conflictDays.has(request.date)) {
        // Outra pessoa "chegou antes": o horário passa a aparecer ocupado. Só na primeira solicitação do dia.
        conflictDays.add(request.date);
        conflicted.add(request.slotId);
        throw new BookingError('SLOT_CONFLICT');
      }
      return { mode: 'demo', persisted: false, request: { ...request, player: { ...request.player, name: request.player.name.trim() } } };
    },
  };
}
