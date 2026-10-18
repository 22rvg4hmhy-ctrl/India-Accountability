const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:4173",
    headless: true,
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: process.env.TEST_PRODUCTION ? "npm run preview" : "npm run dev",
    url: process.env.TEST_BASE_URL || "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});
