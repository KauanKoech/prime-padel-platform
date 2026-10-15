import type { AvailabilitySlot } from "./booking";

export const ARENA_TIME_ZONE = "America/Sao_Paulo";
const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: ARENA_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
});

export function getArenaDate(now: Date): string {
  const parts = dateFormatter.formatToParts(now);
  const part = (type: string) => parts.find(value => value.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function getDateWindow(now: Date): readonly string[] {
  const today = getArenaDate(now);
  // Calendar arithmetic in UTC prevents the device's timezone/DST changing a day.
  const cursor = new Date(`${today}T12:00:00Z`);
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(cursor);
    date.setUTCDate(cursor.getUTCDate() + index);
    return date.toISOString().slice(0, 10);
  });
}

export function isFutureSlot(slot: AvailabilitySlot, now: Date): boolean {
  return Date.parse(slot.startsAt) > now.getTime();
}

export function arenaInstant(date: string, time: string): string {
  // Resolve the arena's offset from IANA data, never from the device timezone.
  const zone = new Intl.DateTimeFormat("en", {
    timeZone: ARENA_TIME_ZONE, timeZoneName: "longOffset",
  }).formatToParts(new Date(`${date}T12:00:00Z`))
    .find(part => part.type === "timeZoneName")!.value;
  const offset = zone === "GMT" ? "+00:00" : zone.replace("GMT", "");
  return `${date}T${time}:00${offset}`;
}
