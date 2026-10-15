import { expect, test } from "@playwright/test";

test("identifica a plataforma Prime Padel", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Plataforma em preparacao." }),
  ).toBeVisible();
  await expect(page).toHaveTitle("Prime Padel");
});
