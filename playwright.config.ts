import { defineConfig, devices } from "@playwright/test";
import { testConfig } from "./testConfig";
const ENV = process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(
    `Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`
  );
  process.exit();
}

export default defineConfig({
  testDir: "./tests/functional",
  globalSetup: `./global-setup`,
  globalTeardown: `./global-teardown`,
  timeout: 20000,
  retries: 0,
  reporter: [
    // [`./CustomReporterConfig.ts`],
    // [`allure-playwright`],
    [`html`, { outputFolder: "html-report", open: "never" }],
  ],

  projects: [
    { name: "setup", testDir: "./tests/", testMatch: "auth.setup.ts" },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        baseURL: testConfig[ENV],
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0,
        },
        storageState: "./auth/superAdminFile.json",
      },
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     baseURL: testConfig[ENV],
    //     viewport: { width: 1920, height: 1080 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0,
    //     },
    //     storageState: "./auth/superAdminFile.json",
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     baseURL: testConfig[ENV],
    //     viewport: { width: 1920, height: 1080 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 0,
    //     },
    //     storageState: "./auth/superAdminFile.json",
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
