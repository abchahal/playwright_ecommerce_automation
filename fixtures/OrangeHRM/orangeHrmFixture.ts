import { createAuthFixture } from '../ReusableFixtures/authFixture';
import { LoginPage } from '../../pages/orangeHrm/loginPage';
import testData from '../../data/orangeHrm/testData.json';

const { validuser } = testData.OrangeHRM;

export const test = createAuthFixture({
  authFile: 'auth/orangehrm.json',

  loginFn: async (page) => {
    const loginPage = new LoginPage(page);
    await loginPage.launchUrl();
    await loginPage.login(validuser.username, validuser.password);
  },
});

export { expect } from '@playwright/test';