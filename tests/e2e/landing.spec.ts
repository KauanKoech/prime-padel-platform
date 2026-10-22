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

  for (const name of [
    'Escolha sua quadra.',
    'Nunca jogou padel?',
    'Conheça nossos professores.',
    'Encontros que viram história.',
    'Você já conhece a West Padel?',
    'Bora jogar hoje?',
    'Sua quadra está esperando.',
  ]) {
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

  // imagens carregadas (as de baixo da dobra são lazy: desce a página inteira antes de conferir)
  for (const id of ['#aulas', '#professores', '#eventos', '#loja', '#comunidade', '#onde-estamos', '.final']) {
    await page.locator(id).first().scrollIntoViewIfNeeded();
  }
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

test('eventos: Prime Cup primeiro, abas com mouse e teclado trocam a arte e o texto', async ({ page }) => {
  await page.goto('/');
  const events = page.locator('#eventos');
  await expect(events.getByRole('tab', { name: 'Prime Cup' })).toHaveAttribute('aria-selected', 'true');
  const panel = events.getByRole('tabpanel');
  await expect(panel).toContainText('01 a 04 de outubro de 2026');
  for (const cat of ['Masculina', 'Feminina', 'Mista', 'Infantil']) await expect(panel).toContainText(cat);
  await expect(events.locator('.events__poster img')).toHaveAttribute('src', '/img/fotos/prime-cup-primavera-2026.webp');

  await events.getByRole('tab', { name: 'Open Prime Padel' }).click();
  await expect(panel).toContainText('R$ 12.000 em premiações');
  await expect(events.locator('.events__poster img')).toHaveAttribute('src', '/img/fotos/open-prime-padel.webp');
  await page.keyboard.press('ArrowRight');
  await expect(events.getByRole('tab', { name: 'Day Use' })).toBeFocused();
  await expect(panel).toContainText('14h às 23h');
});

test('professores: três cartões com fatos reais e WhatsApp com o nome do professor', async ({ page, request, isMobile }) => {
  // os números já vêm no HTML pré-renderizado (o contador só anima no navegador)
  const html = await (await request.get('/')).text();
  for (const n of ['Dorotóvio R. Couto', 'Gustavo Silveira', 'Eduardo Pereira', 'Ex-atleta profissional de squash']) expect(html).toContain(n);

  await page.goto('/');
  const coaches = page.locator('#professores');
  await expect(coaches.locator('.coach')).toHaveCount(3);
  await expect(coaches.getByRole('heading', { level: 3 })).toHaveText(['Dorotóvio R. Couto', 'Gustavo Silveira', 'Eduardo Pereira']);
  const eduardo = coaches.locator('.coach', { hasText: 'Eduardo Pereira' });
  await eduardo.scrollIntoViewIfNeeded();
  await expect(eduardo.locator('.coach__num')).toContainText('31');
  await expect(eduardo.getByRole('link', { name: 'Aula com Eduardo' })).toHaveAttribute(
    'href',
    `https://wa.me/554999107642?text=${encodeURIComponent('Olá! Vi o site da Prime Padel e quero agendar uma aula com o professor Eduardo Pereira.')}`,
  );

  // celular: carrossel horizontal com encaixe; desktop: três colunas
  const track = coaches.locator('.coaches__track');
  const scrolls = await track.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
  expect(scrolls).toBe(Boolean(isMobile));
});

test('aulas: WhatsApp com mensagem pronta e atalho para os professores', async ({ page }) => {
  await page.goto('/');
  // espera a hidratação: a rolagem até a âncora é do Lenis
  await expect(page.locator('html')).toHaveClass(/lenis/);
  const lessons = page.locator('#aulas');
  await expect(lessons).toContainText('Aqui você aprende do zero.');
  await expect(lessons.getByRole('link', { name: 'Quero fazer uma aula' })).toHaveAttribute('href', /^https:\/\/wa\.me\/554999107642\?text=/);
  const link = lessons.getByRole('link', { name: 'Conhecer os professores' });
  // deixa a rolagem suave assentar antes do clique (o Playwright rola até o link no mesmo quadro do clique)
  await link.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await link.click();
  await expect(page.locator('#professores')).toBeInViewport();
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
  // CardNav: a pílula do cabeçalho cresce e mostra as seções em cartões
  const menu = page.getByRole('navigation', { name: 'Seções da página' });
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
  await menu.getByRole('link', { name: 'Prime Cup' }).click();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect(menu.getByRole('link', { name: 'Prime Cup' })).toBeHidden();
  await expect(page.locator('#eventos')).toBeInViewport();
});
