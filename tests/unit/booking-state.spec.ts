import { test, expect } from '@playwright/test';
import { createDraft, changeDate, changeCourt, changeOffer, getFirstIncompleteStep } from '../../src/features/booking/booking-state';
import type { BookingDraft } from '../../src/domain/booking';

const now = new Date('2026-10-15T12:00:00Z');
const selected: BookingDraft = {
  date: '2026-10-16', courtId: 'antidoto', offerId: 'antidoto-60', fictitiousName: 'Jogador de teste',
  slot: { id: 'antidoto-60|2026-10-16|06:00', offerId: 'antidoto-60', date: '2026-10-16',
    startsAt: '2026-10-16T06:00:00-03:00', endsAt: '2026-10-16T07:00:00-03:00', available: true },
};

test('entrada valida somente quadra conhecida e usa calendario da arena', () => {
  expect(createDraft(new Date('2026-10-16T02:59:00Z'), 'antidoto')).toEqual({
    date: '2026-10-15', courtId: 'antidoto', offerId: null, slot: null, fictitiousName: '',
  });
  expect(createDraft(now, 'inexistente').courtId).toBeNull();
  expect(createDraft(now, 'eqi-dgi').offerId).toBe('eqi-dgi-90');
});
test('troca oferta descarta horario sem perder nome', () => {
  expect(changeOffer(selected, 'antidoto-90')).toEqual({ ...selected, offerId: 'antidoto-90', slot: null });
  expect(changeOffer(selected, 'eqi-dgi-90').offerId).toBeNull();
});
test('troca quadra seleciona oferta unica e exige escolha da ANTIDOTO', () => {
  const changed = changeCourt(selected, 'eqi-dgi');
  expect(changed).toEqual({ ...selected, courtId: 'eqi-dgi', offerId: 'eqi-dgi-90', slot: null });
  expect(changeCourt(changed, 'antidoto').offerId).toBeNull();
});
test('troca data limpa horario e preserva oferta e nome', () => {
  expect(changeDate(selected, '2026-10-17')).toEqual({ ...selected, date: '2026-10-17', slot: null });
});
test('avanco exige horario coerente disponivel e nome', () => {
  expect(getFirstIncompleteStep(createDraft(now, null), now)).toBe('time');
  expect(getFirstIncompleteStep({ ...selected, fictitiousName: '   ' }, now)).toBe('details');
  expect(getFirstIncompleteStep(selected, now)).toBe('review');
  expect(getFirstIncompleteStep({ ...selected, offerId: 'antidoto-90' }, now)).toBe('time');
  expect(getFirstIncompleteStep({ ...selected, slot: { ...selected.slot!, available: false } }, now)).toBe('time');
});
test('avanco rejeita horario passado e termino depois do expediente', () => {
  expect(getFirstIncompleteStep(selected, new Date('2026-10-16T09:01:00Z'))).toBe('time');
  expect(getFirstIncompleteStep({ ...selected, slot: { ...selected.slot!, startsAt: '2026-10-16T22:30:00-03:00', endsAt: '2026-10-16T23:30:00-03:00' } }, now)).toBe('time');
});
