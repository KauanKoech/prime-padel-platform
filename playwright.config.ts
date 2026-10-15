import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "on-first-retry" },
  projects: [
    { name: "domain", testDir: "./tests/unit" },
    { name: "chromium-desktop", testDir: "./tests/e2e", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", testDir: "./tests/e2e", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.argv.includes("--project=domain") ? undefined : {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120_000,
    env: { NEXT_PUBLIC_ENABLE_TEST_HARNESS: "1" },
  },
});
