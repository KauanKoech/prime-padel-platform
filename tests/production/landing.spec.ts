import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`landing de producao carrega sem falhas em ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    const failedResponses: string[] = [];
    const external: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("response", response => {
      if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", request => {
      if (new URL(request.url()).hostname !== "127.0.0.1") external.push(request.url());
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Padel em Lages, na Prime Padel.");
    await page.evaluate(() => document.fonts.ready);
    // Bring each booking link into view to catch production-only automatic prefetch.
    for (const link of await page.locator("main a").all()) await link.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    expect(external).toEqual([]);
    expect(failedResponses).toEqual([]);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}
