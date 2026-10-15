import { ARENA_TIME_ZONE } from "./arena-time";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 2,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100).replace(/\u00a0/g, " ");
}
export function formatDuration(minutes: 60 | 90): string {
  return minutes === 60 ? "1h" : "1h30";
}
export function formatArenaDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: ARENA_TIME_ZONE, weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}
export function formatArenaTime(instant: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: ARENA_TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(new Date(instant));
}
