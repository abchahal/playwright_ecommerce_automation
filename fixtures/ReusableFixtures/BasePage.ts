import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string | number) {
        await locator.fill(String(value));
    }

    async getText(locator: Locator) {
        return await locator.textContent();
    }

    async waitFor(locator: Locator) {
        await locator.waitFor();
    }

    async checkVisible(locator: Locator) {
        await locator.isVisible();
    }

    async navigateTo(path: string) {
        await this.page.goto(`${path}`);
    }
    async clearText(locator: Locator) {
        await locator.fill('');
    }

    async verifyToastMessage(locator: Locator, message: string) {
        await expect(locator).toBeVisible();
        await expect(locator).toContainText(message);
    }
    async verifyErrorMessage(locator: Locator, message: string) {
        await expect(locator).toBeVisible();
        await expect(locator).toContainText(message);
    }
};
