import { expect, type Page } from '@playwright/test';
import type { TestControls } from '../../../src/services/mock/scenarios';

export async function openBooking(page: Page, controls: TestControls = {}, courtId?: string) {
  await page.addInitScript(value => { Object.assign(window, { __PRIME_PADEL_TEST__: value }); }, controls);
  await page.clock.install({ time: new Date('2026-10-15T12:00:00Z') });
  await page.goto(`/agendamento${courtId ? `?quadra=${encodeURIComponent(courtId)}` : ''}`);
  await expect(page.getByRole('group', { name: 'Data', exact: true })).toBeVisible();
}
export async function chooseAntidotoSlot(page: Page, duration: 60 | 90) {
  await page.getByRole('radio', { name: 'sexta-feira, 16 de outubro de 2026', exact: true }).check();
  await page.getByRole('radio', { name: 'ANTIDOTO', exact: true }).check();
  await page.getByRole('radio', { name: duration === 60 ? '1h — R$ 140' : '1h30 — R$ 180', exact: true }).check();
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
}

export async function reachReview(page: Page, controls: TestControls = {}, duration: 60 | 90 = 60) {
  await openBooking(page, controls);
  await chooseAntidotoSlot(page, duration);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome fictício', exact: false }).fill('Jogador de teste');
  await page.getByRole('button', { name: 'Revisar simulação', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
}
