import { Page, Locator} from '@playwright/test';

export class BasePage {

    page: Page;

    constructor (page : Page){
        this.page = page;
    }

    async navigate(url: string){
        await this.page.goto(url);
    }

    async click(locator: Locator){
        await locator.click();
    }

    async fill(locator: Locator, text: string){
        await locator.fill(text);
    }

    async getText(locator:Locator){
        await locator.textContent();
    }

    async waitFor(locator: Locator) {
        await locator.waitFor();
    }

    async checkVisible(locator: Locator){
        await locator.isVisible();
    }

}