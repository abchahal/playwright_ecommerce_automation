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

      // Always perform login (navigation handled inside loginFn/LoginPage)
      await options.loginFn(page);

      // wait for successful login
      await page.waitForURL(/dashboard/i);
      await page.waitForLoadState('networkidle');

      // Optionally save session for reuse (not used now)
      // await context.storageState({
      //   path: options.authFile,
      // });

      await use(page);
      await context.close();
    },
  });
};