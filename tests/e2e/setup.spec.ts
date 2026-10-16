import { expect, test } from "@playwright/test";

test("identifica a plataforma Prime Padel", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Padel em Lages, na Prime Padel." }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Prime Padel");
});
