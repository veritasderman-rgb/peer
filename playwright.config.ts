import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const PORT = 3310;
const baseURL = `http://localhost:${PORT}`;

/* Chromium: v CI ho nainstaluje `npx playwright install chromium --with-deps` (executablePath zůstane undefined),
   lokálně se použije předinstalovaný /opt/pw-browsers/chromium, nebo cesta z PLAYWRIGHT_CHROMIUM. */
const local = "/opt/pw-browsers/chromium";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM || (!process.env.CI && existsSync(local) ? local : undefined);

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], launchOptions: { executablePath } },
    },
  ],
});
