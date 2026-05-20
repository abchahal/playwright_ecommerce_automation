import { createAuthFixture } from '../ReusableFixtures/authFixture';
import { LoginPage } from '../../pages/orangeHrm/login-page';
import testData from '../../data/orangeHrm/test-data.json';

const { validuser } = testData.OrangeHRM;

export const test = createAuthFixture({
  authFile: 'auth/orangehrm.json',

  loginFn: async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchUrl();
    await loginPage.login(validuser.username, validuser.password);
    // Wait for dashboard URL and a unique dashboard element after login
    await page.waitForURL(/dashboard/i, { timeout: 90000 });
    await page.waitForSelector('.oxd-topbar-header', { timeout: 30000 });
  },
});

export { expect } from '@playwright/test';