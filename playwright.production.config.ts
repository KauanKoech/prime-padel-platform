import { defineConfig, devices } from "@playwright/test";

// Separate from the deterministic dev harness: exercise the built application.
export default defineConfig({
  testDir: "./tests/production",
  workers: 1,
  reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:3200" },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3200",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
