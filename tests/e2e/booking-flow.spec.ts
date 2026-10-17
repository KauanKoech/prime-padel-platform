import { expect, test } from '@playwright/test';
import { openBooking, chooseAntidotoSlot, reachReview } from './helpers/booking';

for (const [duration, price, end] of [[60, 'R$ 140', '07:00'], [90, 'R$ 180', '07:30']] as const) {
  test(`fluxo completo ANTIDOTO ${duration} com resultado explicitamente simulado`, async ({ page }) => {
    await reachReview(page, {}, duration);
    const review = page.getByRole('region', { name: 'Detalhes da simulação' });
    for (const value of ['Jogador de teste', 'ANTIDOTO', 'sexta-feira, 16 de outubro de 2026', '06:00', end, price]) {
      await expect(review).toContainText(value);
    }
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
    await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
    await expect(page.getByText('Esta demonstração não enviou uma solicitação à arena e não reservou a quadra.')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Resultado da simulação' })).toContainText(price);
    await expect(page.getByRole('button', { name: 'Simular solicitação', exact: true })).toHaveCount(0);
  });
}
test('nome vazio e espacos tem erro associado e foco sem exigir sobrenome', async ({ page }) => {
  await openBooking(page); await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  const name = page.getByRole('textbox', { name: /Nome fictício/ });
  await expect(name).toHaveAttribute('required', '');
  await expect(page.getByRole('textbox')).toHaveCount(1);
  await name.fill('   ');
  await page.getByRole('button', { name: 'Revisar simulação' }).click();
  await expect(name).toBeFocused(); await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAccessibleDescription(/Informe um nome fictício para continuar/);
  await expect(name).toHaveValue('   ');
  await name.fill('  Jogador  ');
  await page.getByRole('button', { name: 'Revisar simulação' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await page.getByRole('button', { name: 'Editar dados' }).click();
  await expect(name).toHaveValue('Jogador');
  await name.fill(''); await name.press('Tab');
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Informe um nome fictício para continuar.')).toBeVisible();
});
test('edicoes conservam nome e atualizam preco horario e revisao', async ({ page }) => {
  await reachReview(page);
  await page.getByRole('button', { name: 'Editar horário' }).click();
  await expect(page.getByRole('radio', { name: /Selecionado$/ })).toBeChecked();
  await page.getByRole('radio', { name: '1h30 — R$ 180', exact: true }).check();
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Jogador de teste');
  await page.getByRole('textbox').fill('Outro jogador fictício');
  await page.getByRole('button', { name: 'Revisar simulação' }).click();
  await expect(page.getByRole('region', { name: 'Detalhes da simulação' })).toContainText('R$ 180');
  await expect(page.getByRole('region', { name: 'Detalhes da simulação' })).toContainText('Outro jogador fictício');
});
test('erro de envio preserva revisao e repeticao conclui', async ({ page }) => {
  await reachReview(page, { scenario: 'submit-error-once' });
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByText('Não foi possível concluir a simulação. Tente novamente.')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await expect(page.getByRole('region', { name: 'Detalhes da simulação' })).toContainText('Jogador de teste');
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
});
test('conflito preserva filtros e nome e exige outro horario', async ({ page }) => {
  await reachReview(page, { scenario: 'conflict-once' });
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  const notice = page.getByText('Na simulação, esse horário ficou indisponível. Escolha outro.');
  await expect(notice).toBeFocused();
  await expect(page.getByRole('radio', { name: '06:00 até 07:00 — Indisponível', exact: true })).toBeDisabled();
  await expect(page.getByRole('radio', { name: 'sexta-feira, 16 de outubro de 2026', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: '1h — R$ 140', exact: true })).toBeChecked();
  await expect(notice).toBeVisible();
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  await expect(notice).toHaveCount(0);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Jogador de teste');
  await page.getByRole('button', { name: 'Revisar simulação' }).click();
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
});
test('envio trava cliques e Enter repetidos e edicoes', async ({ page }) => {
  await reachReview(page, { submitDelayMs: 1200 });
  await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find(el => el.textContent === 'Simular solicitação')!;
    button.click(); button.click(); button.click();
  });
  await expect(page.getByRole('button', { name: 'Simulando solicitação…' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Editar dados' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Editar horário' })).toBeDisabled();
  await page.keyboard.press('Enter'); await page.keyboard.press('Enter');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await expect(page.getByRole('heading', { name: 'Solicitação simulada concluída', level: 1 })).toBeVisible();
  await page.clock.runFor(1500);
  await expect(page.getByRole('heading', { name: 'Solicitação simulada concluída', level: 1 })).toHaveCount(1);
});
test('timeout de envio conserva rascunho e nao conclui tardiamente', async ({ page }) => {
  await reachReview(page, { scenario: 'submit-timeout' });
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Simulando solicitação…' })).toBeVisible();
  await page.clock.runFor(8100);
  await expect(page.getByText('Não foi possível concluir a simulação. Tente novamente.')).toBeVisible();
  await page.clock.runFor(10000);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await expect(page.getByRole('button', { name: 'Simular solicitação', exact: true })).toBeEnabled();
  await expect(page.getByRole('region', { name: 'Detalhes da simulação' })).toContainText('Jogador de teste');
});
test('revisao vencida volta ao horario com aviso e preserva nome oferta', async ({ page }) => {
  await reachReview(page);
  await page.clock.setSystemTime(new Date('2026-10-17T03:01:00Z'));
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByText('Esse horário já passou. Escolha outro para continuar.')).toBeFocused();
  await expect(page.getByRole('radio', { name: 'sábado, 17 de outubro de 2026', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: '1h — R$ 140', exact: true })).toBeChecked();
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Jogador de teste');
});
test('historico guarda etapas conserva rascunho e nao reenvia resultado', async ({ page }) => {
  await reachReview(page);
  await page.goBack(); await expect(page.getByRole('textbox')).toHaveValue('Jogador de teste');
  await page.goBack(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await page.goForward(); await expect(page.getByRole('textbox')).toHaveValue('Jogador de teste');
  await page.goForward(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
  await page.goBack(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
  await page.goForward(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
  const restart = page.getByRole('button', { name: 'Simular outro horário' });
  await restart.focus();
  await restart.press('Enter');
  await expect(page.getByRole('heading', { name: 'Escolha seu horário', level: 1 })).toBeFocused();
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
  await expect(page.getByRole('radio', { name: 'quinta-feira, 15 de outubro de 2026', exact: true })).toBeChecked();
  await page.goBack(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('');
});
test('entrada direta recarga saida e pagehide descartam visita', async ({ page }) => {
  await reachReview(page);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await expect(page.getByRole('textbox')).toHaveValue('');
  await page.getByRole('textbox').fill('Jogador de teste');
  await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Padel em Lages, na Prime Padel.');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
  await page.goto('/agendamento?etapa=review&nome=Real&preco=1');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('textbox').fill('Jogador de teste');
  await page.evaluate(() => {
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
});
test('popstate nao pula validacao nem restaura resultado inexistente', async ({ page }) => {
  await openBooking(page);
  await page.evaluate(() => {
    const original = history.state;
    history.pushState({ ...original, primePadel: { ...original.primePadel, step: 'result' } }, '', location.href);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.evaluate(() => {
    const original = history.state;
    history.pushState({ ...original, primePadel: { ...original.primePadel, step: 'review' } }, '', location.href);
    window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  });
  await expect(page.getByRole('textbox')).toBeFocused();
  await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
test('nome nao aparece em historico storage cookies console requests ou URL', async ({ page, context }) => {
  const observed: string[] = [];
  page.on('console', m => observed.push(m.text()));
  page.on('request', r => observed.push(r.url(), r.postData() ?? ''));
  await reachReview(page);
  const check = async () => {
    const saved = await page.evaluate(() => ({ history: history.state, local: { ...localStorage }, session: { ...sessionStorage }, cookies: document.cookie, url: location.href }));
    expect(JSON.stringify(saved)).not.toContain('Jogador de teste');
    expect(Object.keys(saved.history.primePadel).sort()).toEqual(['step', 'visitId']);
    expect(saved.history.__NA).toBe(true);
    expect(JSON.stringify(await context.cookies())).not.toContain('Jogador de teste');
    expect(observed.join(' ')).not.toContain('Jogador de teste');
  };
  await check();
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Solicitação simulada concluída');
  await check();
  await expect(page.getByRole('textbox', { name: /telefone|email|e-mail|cpf|pagamento/i })).toHaveCount(0);
});
test('resposta antiga de disponibilidade nao altera revisao', async ({ page }) => {
  await openBooking(page, { queryDelaysMs: [1200, 50] }, 'antidoto');
  await page.getByRole('radio', { name: '1h30 — R$ 180', exact: true }).check();
  await expect(page.getByText('Carregando horários simulados…')).toBeVisible();
  await page.getByRole('radio', { name: '1h — R$ 140', exact: true }).check();
  await page.getByRole('radio', { name: /Disponível$/ }).first().check();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('textbox').fill('Jogador de teste');
  await page.getByRole('button', { name: 'Revisar simulação' }).click();
  await page.clock.runFor(1500);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
  await expect(page.getByRole('region', { name: 'Detalhes da simulação' })).toContainText('R$ 140');
});

test('viewport visual reduzida libera barra durante preenchimento', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await openBooking(page); await chooseAntidotoSlot(page, 60);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('textbox').focus();
  // Emulates the resize event contract; real mobile-keyboard validation remains milestone 5.
  await page.evaluate(() => {
    Object.defineProperty(window.visualViewport, 'height', { configurable: true, value: 420 });
    window.visualViewport!.dispatchEvent(new Event('resize'));
  });
  const action = page.getByRole('button', { name: 'Revisar simulação', exact: true });
  await expect.poll(() => action.evaluate(el => getComputedStyle(el.parentElement!.parentElement!).position)).toBe('static');
  await page.getByRole('textbox').fill('Jogador de teste');
  await action.click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revise a simulação');
});

test('expiracao durante o envio tambem retorna ao horario', async ({ page }) => {
  await reachReview(page, { submitDelayMs: 1200 });
  await page.clock.setSystemTime(new Date('2026-10-16T08:59:00Z'));
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Simulando solicitação…' })).toBeVisible();
  await page.clock.setSystemTime(new Date('2026-10-16T09:01:00Z'));
  await expect(page.getByText('Esse horário já passou. Escolha outro para continuar.')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Continuar', exact: true })).toBeDisabled();
  await expect(page.getByRole('radio', { name: '1h — R$ 140', exact: true })).toBeChecked();
});
test('sair durante envio cancela tentativa sem resultado tardio ao retornar', async ({ page }) => {
  await reachReview(page, { submitDelayMs: 2000 });
  await page.getByRole('button', { name: 'Simular solicitação', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Simulando solicitação…' })).toBeVisible();
  await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Padel em Lages, na Prime Padel.');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await page.clock.runFor(2100);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha seu horário');
  await expect(page.getByRole('group', { name: 'Quadra', exact: true }).locator(':checked')).toHaveCount(0);
});
