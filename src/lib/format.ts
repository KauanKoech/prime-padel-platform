import { arena } from '../content/arena';

export const money = (cents: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
    .format(cents / 100)
    .replace(/\s/g, ' ');

/** 60 -> "1h", 90 -> "1h30" */
export const duration = (minutes: number) =>
  minutes % 60 === 0 ? `${minutes / 60}h` : `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;

/** Data local (AAAA-MM-DD) no fuso da arena. */
export function localDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: arena.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Hora local (HH:MM) no fuso da arena. */
export function localTime(now = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: arena.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(now);
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export const weekday = (date: string) => new Date(`${date}T12:00:00Z`).getUTCDay();

const fmt = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('pt-BR', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`)).replace('.', '');

/** "sex., 17 de outubro" sem ponto: "sex, 17 de outubro" */
export const longDate = (date: string) => fmt(date, { weekday: 'short', day: 'numeric', month: 'long' });
export const shortWeekday = (date: string) => fmt(date, { weekday: 'short' });
export const shortMonth = (date: string) => fmt(date, { month: 'short' });
export const dayOfMonth = (date: string) => new Date(`${date}T12:00:00Z`).getUTCDate();

export const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
export const toClock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
