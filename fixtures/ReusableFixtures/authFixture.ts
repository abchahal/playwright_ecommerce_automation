import { test as base, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';

type AuthFixtures = {
  authenticatedPage: Page;
};

type AuthOptions = {
  authFile: string;
  loginFn: (page: Page) => Promise<void>;
};

export const createAuthFixture = (options: AuthOptions) => {
  return base.extend<AuthFixtures>({

    authenticatedPage: async ({ browser }, use) => {

      // Always create a new context and perform login
      const context: BrowserContext = await browser.newContext();
      const page = await context.newPage();

      try {
        // Wait for login fields to be visible before login
        // await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 60000 });
        // await page.waitForSelector('input[placeholder="Username"]', { timeout: 20000 });
        // await page.waitForSelector('input[placeholder="Password"]', { timeout: 20000 });

        // Always perform login (navigation handled inside loginFn/LoginPage)
        await options.loginFn(page);

        // Optionally wait for a post-login URL or state in the app-specific fixture or test
        await page.waitForLoadState('networkidle');
      } catch (e) {
        // Take a screenshot for debugging
        await page.screenshot({ path: 'authFixture-login-failure.png', fullPage: true });
        console.error('Login fixture failed:', e);
        throw e;
      }

      await use(page);
      await context.close();
    },
  });
};