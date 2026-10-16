import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`agendamento de producao ignora controles de teste em ${width}px`, async ({ page }) => {
    const errors: string[] = [], external: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('request', request => { if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => { window.__PRIME_PADEL_TEST__ = { scenario: 'query-timeout' }; });
    await page.clock.install({ time: new Date('2026-10-15T12:00:00Z') });
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: 'Ver horários', exact: true }).click();
    await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
    await page.getByRole('radio', { name: 'EQI / DGI INVESTIMENTOS', exact: true }).check();
    await page.getByRole('radio', { name: /Disponível$/ }).first().check();
    await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeEnabled();
    await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Dados de demonstração' })).toBeVisible();
    await page.getByRole('textbox', { name: /Nome fictício/ }).fill('Jogador de teste');
    await page.getByRole('button', { name: 'Revisar simulação' }).click();
    await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Solicitação simulada concluída' })).toBeVisible();
    await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
    await page.locator('header').getByRole('link', { name: 'Ver horários', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
}
