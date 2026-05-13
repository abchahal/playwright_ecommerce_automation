import { createAuthFixture } from '../ReusableFixtures/authFixture';
import { LoginPage } from '../../pages/orangeHrm/loginPage';
import testData from '../../data/orangeHrm/testData.json';

const { validuser } = testData.OrangeHRM;

export const test = createAuthFixture({
  baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard',
  authFile: 'auth/orangehrm.json',

  loginFn: async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchUrl();
    await loginPage.login(validuser.username, validuser.password);
    await page.waitForURL(/dashboard/);
  },
});

export { expect } from '@playwright/test';