import { expect, test, type Page } from '@playwright/test';
import { demoConfig } from '../../src/services/booking-demo';
import { addDays, localDate, longDate } from '../../src/lib/format';

/** Abre o agendamento pelo botão principal do hero. */
async function openBooking(page: Page) {
  await page.goto('/');
  await page.locator('.hero__ctas').getByRole('link', { name: 'Ver horários' }).click();
  const dialog = page.getByRole('dialog', { name: 'Agendar quadra' });
  await expect(dialog).toBeVisible();
  return dialog;
}

const dayAt = (offset: number) => longDate(addDays(localDate(), offset));

async function pickDate(page: Page, offset: number) {
  await page.getByRole('radio', { name: dayAt(offset), exact: true }).check();
}

async function toSlots(page: Page) {
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Escolha o horário' })).toBeVisible();
}

async function fillPlayer(page: Page) {
  await page.getByLabel('Nome').fill('Ana Exemplo');
  await page.getByLabel('Telefone com DDD').fill('(49) 99999-0000');
}

test('fluxo feliz: data, quadra, duração, horário, dados, revisão e solicitação', async ({ page }) => {
  const posts: string[] = [];
  page.on('request', (r) => {
    if (r.method() !== 'GET') posts.push(r.url());
  });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  const dialog = await openBooking(page);
  await expect(dialog.getByText('Demonstração', { exact: true })).toBeVisible();

  await pickDate(page, 1);
  await dialog.getByRole('radio', { name: /ANTÍDOTO/ }).check();
  await dialog.getByRole('radio', { name: /^1h R\$ 140$/ }).check();
  await toSlots(page);

  // carregando e depois a grade
  const first = dialog.getByRole('button', { name: /livre$/ }).first();
  await first.click();
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Como podemos chamar você?' })).toBeVisible();
  await fillPlayer(page);
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Tudo certo para enviar?' })).toBeVisible();
  const review = dialog.locator('.bk-review');
  await expect(review).toContainText('ANTÍDOTO');
  await expect(review).toContainText('R$ 140');
  await expect(review).toContainText('Ana Exemplo');

  await page.getByRole('button', { name: 'Enviar solicitação' }).click();
  await expect(page.getByRole('heading', { name: 'Solicitação enviada!' })).toBeVisible();
  await expect(dialog.getByRole('status')).toContainText('Nenhuma reserva real foi registrada');

  // nada sai do navegador e nada fica guardado
  expect(posts).toEqual([]);
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);

  await page.getByRole('button', { name: 'Fechar agendamento' }).click();
  await expect(dialog).toBeHidden();
  expect(errors).toEqual([]);
});

test('validação dos dados com foco no primeiro campo inválido', async ({ page }) => {
  await openBooking(page);
  await pickDate(page, 1);
  await toSlots(page);
  await page.getByRole('button', { name: /livre$/ }).first().click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByText('Informe um nome com pelo menos 2 letras.')).toBeVisible();
  await expect(page.getByText('Informe um telefone com DDD (10 ou 11 dígitos).')).toBeVisible();
  await expect(page.getByLabel('Nome')).toBeFocused();
});

test('estado vazio: dia sem horários leva de volta à escolha da data', async ({ page }) => {
  await openBooking(page);
  await pickDate(page, demoConfig.emptyDayOffset);
  await toSlots(page);
  await expect(page.getByRole('status').filter({ hasText: 'Nenhum horário livre neste dia' })).toBeVisible();
  await page.getByRole('button', { name: 'Escolher outra data' }).click();
  await expect(page.getByRole('heading', { name: 'Quando você quer jogar?' })).toBeVisible();
});

test('estado de erro: falha na consulta e nova tentativa', async ({ page }) => {
  await openBooking(page);
  await pickDate(page, demoConfig.failingDayOffset);
  await toSlots(page);
  await expect(page.getByRole('alert').filter({ hasText: 'Não foi possível carregar os horários' })).toBeVisible();
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('button', { name: /livre$/ }).first()).toBeVisible();
});

test('conflito simulado: o horário é ocupado por outra pessoa durante o envio', async ({ page }) => {
  const dialog = await openBooking(page);
  await pickDate(page, demoConfig.conflictDayOffset);
  await toSlots(page);
  const slot = dialog.getByRole('button', { name: /livre$/ }).first();
  const time = (await slot.locator('.slot__time').textContent())!;
  await slot.click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await fillPlayer(page);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Enviar solicitação' }).click();

  await expect(page.getByRole('alert').filter({ hasText: 'Alguém reservou esse horário' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Escolha o horário' })).toBeVisible();
  // o horário disputado agora aparece ocupado
  await expect(dialog.getByRole('button', { name: `${time} ocupado` })).toBeDisabled();

  // outro horário passa; os dados digitados continuam lá
  await dialog.getByRole('button', { name: /livre$/ }).first().click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByLabel('Nome')).toHaveValue('Ana Exemplo');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Enviar solicitação' }).click();
  await expect(page.getByRole('heading', { name: 'Solicitação enviada!' })).toBeVisible();
});

test('Esc fecha o agendamento, devolve o foco e descarta os dados', async ({ page }) => {
  await openBooking(page);
  await pickDate(page, 1);
  await toSlots(page);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Agendar quadra' })).toBeHidden();
  await expect(page.locator('.hero__ctas').getByRole('link', { name: 'Ver horários' })).toBeFocused();
  await page.locator('.hero__ctas').getByRole('link', { name: 'Ver horários' }).click();
  await expect(page.getByRole('heading', { name: 'Quando você quer jogar?' })).toBeVisible();
});
