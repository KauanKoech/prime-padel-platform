import { expect, test } from '@playwright/test';

test('landing pré-renderizada: título, seções e dados da arena', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text());
  });

  await page.goto('/');
  await expect(page).toHaveTitle('Prime Padel | Quadras de padel em Lages, SC');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Seu próximo jogo começa na Prime.');
  await expect(page.locator('h1')).toHaveCount(1);

  for (const name of ['Escolha onde o jogo acontece.', 'Menos combinação, mais jogo.', 'Encontros que viram história.', 'Tudo para entrar em quadra.']) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeAttached();
  }
  await expect(page.getByText('Avenida Belisário Ramos, 4241').first()).toBeAttached();

  // dados pendentes aparecem marcados
  const visit = page.locator('#onde-estamos');
  await expect(visit.locator('tr', { hasText: 'Quarta' })).toContainText('a confirmar');
  await expect(visit.locator('li', { hasText: '+55 49 9910-7642' })).toContainText('a confirmar');

  // links reais
  await expect(page.locator('a[href^="https://wa.me/554999107642?text="]').first()).toBeAttached();
  await expect(page.locator('a[href="https://www.instagram.com/primepadellages/"]').first()).toHaveAttribute('rel', 'noopener');

  // imagens carregadas
  await page.locator('#eventos').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img').evaluateAll((imgs) => imgs.filter((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth === 0).length)).toBe(0);

  expect(errors).toEqual([]);
});

test('quadras: escolher quadra e duração leva aos horários já preenchidos', async ({ page }) => {
  await page.goto('/');
  const courts = page.locator('#quadras');
  await courts.getByRole('button', { name: /ANTÍDOTO/ }).click();
  await expect(courts.getByRole('button', { name: /ANTÍDOTO/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(courts.locator('.courts__detail-name')).toHaveText('ANTÍDOTO');
  await courts.getByRole('radio', { name: /^1h R\$ 140$/ }).check();
  await courts.getByRole('link', { name: 'Ver horários desta quadra' }).click();

  const dialog = page.getByRole('dialog', { name: 'Agendar quadra' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('radio', { name: /ANTÍDOTO/ })).toBeChecked();
  await expect(dialog.getByRole('radio', { name: /^1h R\$ 140$/ })).toBeChecked();
});

test('eventos: abas com mouse e teclado trocam a arte e o texto', async ({ page }) => {
  await page.goto('/');
  const events = page.locator('#eventos');
  await events.getByRole('tab', { name: 'Prime Cup' }).click();
  await expect(events.getByRole('tabpanel')).toContainText('Primavera 2026');
  await expect(events.locator('img')).toHaveAttribute('src', '/img/prime-cup.webp');
  await page.keyboard.press('ArrowRight');
  await expect(events.getByRole('tab', { name: 'Day Use' })).toBeFocused();
  await expect(events.getByRole('tabpanel')).toContainText('14h às 23h');
});

test('sem rolagem lateral em larguras de celular a desktop', async ({ page }) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `largura ${width}`).toBeLessThanOrEqual(0);
  }
});

test('movimento reduzido: conteúdo visível e sem rolagem suave', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.classList.contains('lenis'))).toBe(false);
  const hidden = await page.locator('[data-reveal]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  expect(hidden).toBe(0);
});

test('menu do celular abre, navega e fecha', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'menu só existe no celular');
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const menu = page.getByRole('dialog', { name: 'Navegação principal' });
  await expect(menu).toBeVisible();
  await menu.getByRole('link', { name: 'Eventos' }).click();
  await expect(menu).toBeHidden();
  await expect(page.locator('#eventos')).toBeInViewport();
});
