import { test, expect } from '@playwright/test';
import { openBooking, chooseAntidotoSlot } from './helpers/booking';

test('entrada e ofertas: ANTIDOTO exige duracao explicita', async ({ page }) => {
  await openBooking(page, {}, 'antidoto');
  await expect(page.getByRole('radio', { name: 'ANTIDOTO', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: '1h — R$ 140', exact: true })).not.toBeChecked();
  await expect(page.getByRole('radio', { name: '1h30 — R$ 180', exact: true })).not.toBeChecked();
  await page.getByRole('radio', { name: '1h — R$ 140', exact: true }).check();
  await expect(page.getByRole('group', { name: 'Horários simulados' })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Indisponível$/ }).first()).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
  await chooseAntidotoSlot(page, 60);
  await expect(page.getByRole('complementary', { name: 'Resumo da simulação' })).toContainText('R$ 140');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Dados de demonstração' })).toBeFocused();
  await page.getByRole('button', { name: 'Voltar ao horário' }).click();
  await expect(page.getByRole('radio', { name: /Selecionado$/ })).toBeChecked();
});
test('quadra invalida e parametros extras nao criam selecao', async ({ page }) => {
  await openBooking(page, {}, 'inexistente');
  await expect(page.getByText('Escolha uma quadra para continuar', { exact: true })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
  await expect(page.getByRole('complementary')).not.toContainText('R$ 0');
  await page.goto('/agendamento?quadra=antidoto&preco=1&etapa=result&nome=Teste');
  await expect(page.getByRole('heading', { name: 'Escolha seu horário' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Duração', exact: true }).locator(':checked')).toHaveCount(0);
});
test('cada quadra oferece somente seus precos e duracoes', async ({ page }) => {
  await openBooking(page);
  for (const [court, label] of [
    ['EQI / DGI INVESTIMENTOS', '1h30 — R$ 190'], ['ADEMICOM', '1h30 — R$ 180'],
    ['O BOTICARIO', '1h30 — R$ 180'], ['RRTUR', '1h30 — R$ 180'],
  ]) {
    await page.getByRole('radio', { name: court, exact: true }).check();
    const durations = page.getByRole('group', { name: 'Duração', exact: true });
    await expect(durations.getByRole('radio')).toHaveCount(1);
    await expect(durations.getByRole('radio', { name: label, exact: true })).toBeChecked();
  }
  await chooseAntidotoSlot(page, 90);
  await expect(page.getByRole('complementary')).toContainText('R$ 180');
});
test('janela de 14 dias e controles de rolagem nao alteram data', async ({ page }) => {
  await openBooking(page);
  const dates = page.getByRole('group', { name: 'Data', exact: true });
  await expect(dates.getByRole('radio')).toHaveCount(14);
  const today = dates.getByRole('radio', { name: 'quinta-feira, 15 de outubro de 2026', exact: true });
  await expect(today).toBeChecked();
  await page.getByRole('button', { name: 'Próximas datas' }).click();
  await expect(today).toBeChecked();
  await expect(dates.getByRole('radio').last()).toHaveAccessibleName('quarta-feira, 28 de outubro de 2026');
  await page.getByRole('button', { name: 'Datas anteriores' }).click();
  await expect(today).toBeChecked();
});
test('quarta pendente aparece mesmo sem oferta e mantem quadras', async ({ page }) => {
  await openBooking(page);
  await page.getByRole('radio', { name: 'quarta-feira, 21 de outubro de 2026', exact: true }).check();
  await expect(page.getByText('O horário de quarta-feira ainda precisa de confirmação.')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).getByRole('radio')).toHaveCount(5);
  await expect(page.getByRole('group', { name: 'Horários simulados' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Escolher outra data' }).click();
  await expect(page.getByRole('radio', { name: 'quarta-feira, 21 de outubro de 2026', exact: true })).toBeFocused();
});
for (const scenario of ['empty', 'all-unavailable'] as const) {
  test(`${scenario} informa vazio sem erro tecnico`, async ({ page }) => {
    await openBooking(page, { scenario }, 'eqi-dgi');
    await expect(page.getByText('Nenhum horário disponível na simulação para esta combinação.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tentar novamente' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
    if (scenario === 'all-unavailable') await expect(page.getByRole('radio', { name: /Indisponível$/ }).first()).toBeDisabled();
  });
}
test('erro permite repetir sem perder filtros', async ({ page }) => {
  await openBooking(page, { scenario: 'query-error-once' }, 'eqi-dgi');
  await expect(page.getByText('Não foi possível carregar os horários simulados.')).toBeVisible();
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('radio', { name: /Disponível$/ }).first()).toBeVisible();
  await expect(page.getByRole('radio', { name: 'EQI / DGI INVESTIMENTOS', exact: true })).toBeChecked();
});
test('consulta sem resposta termina em erro recuperavel apos 8 segundos', async ({ page }) => {
  await openBooking(page, { scenario: 'query-timeout' }, 'eqi-dgi');
  await expect(page.getByText('Carregando horários simulados…')).toBeVisible();
  await page.clock.runFor(8100);
  await expect(page.getByText('Não foi possível carregar os horários simulados.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tentar novamente' })).toBeEnabled();
});
test('consulta antiga nao substitui oferta atual e loading elimina slots anteriores', async ({ page }) => {
  await openBooking(page, { queryDelaysMs: [1200, 50], queryDelayMs: 1200 }, 'antidoto');
  await page.getByRole('radio', { name: '1h — R$ 140', exact: true }).check();
  await expect(page.getByText('Carregando horários simulados…')).toBeVisible();
  await page.getByRole('radio', { name: '1h30 — R$ 180', exact: true }).check();
  await expect(page.getByRole('radio', { name: '10:00 até 11:30 — Disponível', exact: true })).toBeVisible();
  await page.clock.runFor(1300);
  await expect(page.getByRole('radio', { name: '10:00 até 11:00 — Disponível', exact: true })).toHaveCount(0);
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  await page.getByRole('radio', { name: '1h — R$ 140', exact: true }).check();
  await expect(page.getByText('Carregando horários simulados…')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Horários simulados' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
});
test('trocas de data quadra e duracao limpam horario', async ({ page }) => {
  await openBooking(page);
  await chooseAntidotoSlot(page, 60);
  for (const label of ['sábado, 17 de outubro de 2026', 'EQI / DGI INVESTIMENTOS', 'ANTIDOTO']) {
    await page.getByRole('radio', { name: label, exact: true }).check();
    await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
    await expect(page.getByRole('radio', { name: /Selecionado$/ })).toHaveCount(0);
    if (label !== 'ANTIDOTO') await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  }
  await expect(page.getByRole('group', { name: 'Duração', exact: true }).locator(':checked')).toHaveCount(0);
});
test('virada de dia atualiza janela e nao permite avancar com selecao vencida', async ({ page }) => {
  await openBooking(page);
  await chooseAntidotoSlot(page, 60);
  await page.clock.setSystemTime(new Date('2026-10-17T02:59:00Z'));
  await page.clock.setSystemTime(new Date('2026-10-17T03:01:00Z'));
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByText('Esse horário já passou. Escolha outro para continuar.')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'sábado, 17 de outubro de 2026', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'sexta-feira, 16 de outubro de 2026', exact: true })).toHaveCount(0);
  await expect(page.getByRole('radio', { name: '1h — R$ 140', exact: true })).toBeChecked();
  await expect(page.getByRole('heading', { name: 'Escolha seu horário' })).toBeVisible();
});
test.describe('calendario independente do fuso do dispositivo', () => {
  test.use({ timezoneId: 'Asia/Tokyo' });
  test('usa hoje da arena perto da meia-noite', async ({ page }) => {
    await openBooking(page);
    await page.clock.setSystemTime(new Date('2026-10-16T02:59:00Z'));
    await page.reload();
    await expect(page.getByRole('radio', { name: 'quinta-feira, 15 de outubro de 2026', exact: true })).toBeChecked();
  });
});

test('foco por setas nos horarios permanece acima da barra inferior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await openBooking(page, {}, 'eqi-dgi');
  await page.getByRole('radio', { name: /Disponível$/ }).first().focus();
  for (let index = 0; index < 18; index++) {
    await page.keyboard.press('ArrowDown');
    const focused = page.locator('input:focus');
    await expect(focused).toBeChecked();
    const rect = await focused.boundingBox();
    const bar = await page.getByRole('button', { name: 'Continuar', exact: true })
      .evaluate(element => element.parentElement!.parentElement!.getBoundingClientRect().top);
    expect(rect!.y).toBeGreaterThanOrEqual(0);
    expect(rect!.y + rect!.height).toBeLessThanOrEqual(bar - 3);
  }
});
