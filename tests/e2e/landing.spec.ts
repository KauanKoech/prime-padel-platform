import { expect, test } from "@playwright/test";

test("conteudo factual e entradas do fluxo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Padel em Lages, na Prime Padel.");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("#quadras article")).toHaveCount(5);
  const antidoto = page.locator("#quadras article").filter({ hasText: "ANTIDOTO" });
  await expect(antidoto).toContainText("1h — R$ 140");
  await expect(antidoto).toContainText("1h30 — R$ 180");
  await expect(antidoto.getByRole("link")).toHaveAttribute("href", "/agendamento?quadra=antidoto");
  for (const [name, id, price] of [
    ["EQI / DGI INVESTIMENTOS", "eqi-dgi", "190"],
    ["ADEMICOM", "ademicom", "180"],
    ["O BOTICARIO", "o-boticario", "180"],
    ["RRTUR", "rrtur", "180"],
  ]) {
    const card = page.locator("#quadras article").filter({ hasText: name });
    await expect(card.getByRole("heading")).toHaveText(name);
    await expect(card).toContainText(`1h30 — R$ ${price}`);
    await expect(card.getByRole("link")).toHaveAttribute("href", `/agendamento?quadra=${id}`);
  }
  expect(await page.locator("main > section").evaluateAll(sections => sections.map(section => section.id)))
    .toEqual(["inicio", "quadras", "como-funciona", "eventos", "loja", "localizacao", "experimente"]);
  await expect(page.getByText("Quarta-feira: horário a confirmar")).toBeVisible();
  await expect(page.getByText("WhatsApp: contato a confirmar")).toBeVisible();
  await expect(page.locator('a[href*="wa.me"], a[href^="tel:"], a[href="#"]')).toHaveCount(0);
  await expect(page.locator("#localizacao")).toContainText(
    "Avenida Belisario Ramos, 4241, Sao Cristovao, Lages - SC, CEP 88501-065, Brasil",
  );
  await expect(page.locator("#localizacao")).toContainText("Domingo: 09:00–20:00");
  await expect(page.locator("#eventos")).toContainText("Datas e inscrições ainda não confirmadas nesta página.");
  await expect(page.locator("#eventos").getByRole("heading", { level: 3 }))
    .toHaveText(["Open Prime Padel", "Prime Cup"]);
  await expect(page.locator("#eventos a")).toHaveAttribute("href", "https://www.instagram.com/primepadellages/");
  await expect(page.locator("#loja a")).toHaveAttribute("href", "https://www.instagram.com/westpadelstore/");
  await expect(page.locator("#inicio")).toContainText("Agendamento demonstrativo. Nenhuma reserva real será feita.");
  await expect(page.getByRole("link", { name: "Ver horários", exact: true }).first())
    .toHaveAttribute("href", "/agendamento");
  await expect(page.getByRole("link", { name: /login|pagar|política|inscrever/i })).toHaveCount(0);
});

test("menu preserva foco e libera pagina", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  const dialog = page.getByRole("dialog", { name: "Navegação principal" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Ver horários", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Quadras", exact: true }).click();
  await expect(page.locator("#quadras h2")).toBeFocused();
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect(trigger).not.toBeVisible();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Quadras", exact: true }))
    .toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
});

test("placeholder tolera imagem ausente", async ({ page }) => {
  await page.route("**/brand/**", route => route.abort());
  await page.goto("/");
  await expect(page.getByText("Imagem ilustrativa da marca")).toBeVisible();
  await expect(page.getByRole("figure").getByText("Prime Padel", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Prime Padel — início" }).first()).toBeVisible();
  await page.getByRole("link", { name: "Conhecer as quadras" }).click();
  await expect(page.locator("#quadras h2")).toBeFocused();
  await expect(page.locator("#quadras article").first().getByRole("link"))
    .toHaveAttribute("href", "/agendamento?quadra=eqi-dgi");
});

test("carrega assets locais sem erros e respeita movimento reduzido", async ({ page }) => {
  const external: string[] = [];
  const errors: string[] = [];
  page.on("request", request => {
    if (!new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/)) external.push(request.url());
  });
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("#inicio")).toBeVisible();
  const fontLoaded = await page.evaluate(() =>
    Array.from(document.fonts).some(font => font.family.includes("Instrument Sans") && font.status === "loaded"));
  expect(fontLoaded).toBe(true);
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.getByRole("link", { name: "Conhecer as quadras" })
    .evaluate(element => getComputedStyle(element).transitionDuration)).toBe("0s");
});

test("navegacao compacta quando texto ampliado nao cabe", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Principal" })).toBeVisible();
  await page.evaluate(() => { document.documentElement.style.fontSize = "44px"; });
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Principal" })).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("reflow da landing e alvos acessiveis", async ({ page }) => {
  for (const width of [320, 390, 768, 960, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `${width}px`).toBeLessThanOrEqual(width);
    await expect(page.getByRole("heading", { name: "EQI / DGI INVESTIMENTOS", exact: true })).toBeVisible();
    const undersized = await page.locator("main a, header a, header button, footer a").evaluateAll(elements =>
      elements.filter(element => {
        const box = element.getBoundingClientRect();
        return getComputedStyle(element).visibility !== "hidden" && box.width > 0 && box.height > 0 &&
          (box.width < 44 || box.height < 44);
      }).map(element => element.textContent),
    );
    expect(undersized, `touch targets at ${width}px`).toEqual([]);
  }
});
