import { test, expect } from '@playwright/test';
import { LoginPage } from "../../pages/orangeHrm/login-page";
import { URLs } from "../../data/orangeHrm/baseUrls";
import testData from "../../data/orangeHrm/testData.json";
const { validuser, invalidUser, emptyusername, emptyPassword } = testData.OrangeHRM;


test.describe('OrangeHRM Login Page test', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate(URLs.OrangeHRM.BASEURL);
    });

    test('valid login redirects to dashboard', async ({ page }) => {
        await loginPage.login(validuser.username, validuser.password);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Login with invalid password', async () => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await expect(loginPage.getErrorMsg()).toContainText("Invalid");
    });

    test('Login with empty username', async () => {
        await loginPage.login(emptyusername.username, emptyusername.password);
        await expect(loginPage.requiredError()).toContainText("Required");
    });

    test('Login with empty password', async () => {
        await loginPage.login(emptyPassword.username, emptyPassword.password);
        await expect(loginPage.requiredError()).toContainText("Required");
    });

    test('Login page UI elements verification', async () => {
        await loginPage.uiValidation();
    });
});
