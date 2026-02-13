import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  outputDir: 'test-results/',

  reporter: [
    ['html', {
      open: process.env.CI ? 'never' : 'on-failure', 
      outputFolder: 'playwright-report',
      retainOnFailure: true,
    }],
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        OS: process.platform,
        NODE_VERSION: process.version,
        BASE_URL: process.env.BASE_URL || 'https://fakerestapi.azurewebsites.net',
        PLAYWRIGHT_VERSION: require('@playwright/test/package.json').version,
      },
    }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://fakerestapi.azurewebsites.net',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'api',
      testMatch: /.*\.spec\.ts/,
    },
  ],
});