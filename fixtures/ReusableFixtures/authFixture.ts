import { test as base, Page, BrowserContext } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

type AuthOptions = {
  baseURL: string;
  authFile: string;
  loginFn: (page: Page) => Promise<void>;
};

export const createAuthFixture = (options: AuthOptions) => {
  return base.extend<AuthFixtures>({

    authenticatedPage: async ({ browser }, use) => {
      let context: BrowserContext;

      try {
        context = await browser.newContext({
          storageState: options.authFile,
        });
      } catch {
        context = await browser.newContext();
      }

      const page = await context.newPage();

      // try opening dashboard / app entry point
      await page.goto(options.baseURL);

      const isLoggedIn = page.url() !== options.baseURL;

      if (!isLoggedIn) {
        await options.loginFn(page);

        await context.storageState({
          path: options.authFile,
        });
      }

      await use(page);
      await context.close();
    },
  });
};