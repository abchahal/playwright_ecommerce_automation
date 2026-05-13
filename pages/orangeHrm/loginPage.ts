import { Locator, Page } from "@playwright/test";
import { BasePage } from '../../fixtures/ReusableFixtures/BasePage'

export class LoginPage extends BasePage {
    readonly usernameInput!: Locator;
    readonly passwordInput! : Locator;
    readonly loginButton! : Locator;
    readonly url! : string;
    readonly invalidCredError!: Locator;
    readonly requiredErr! : Locator;
    readonly loginPageLogo! : Locator;

    constructor(page: Page) {
        super(page);
        this.url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', {name: "Login"});
        this.invalidCredError = page.getByText('Invalid credentials', { exact: true });
        this.requiredErr = page.getByText('Required', { exact: true });
        this.loginPageLogo = page.locator('div.orangehrm-login-slot-wrapper');
    }

    async launchUrl(): Promise<void> {
    await this.navigate(this.url);
    }

    async login(username: string, password: string ){
        await this.fill(this.usernameInput,username);
        await this.fill(this.passwordInput,password);
        await this.click(this.loginButton);
    }
    getErrorMsg(){
        return this.invalidCredError;
    }

    requiredError(){
        return this.requiredErr;
    }
    async uiValidation(){
        await this.checkVisible(this.usernameInput);
        await this.checkVisible(this.passwordInput);
        await this.checkVisible(this.loginButton);
        await this.checkVisible(this.loginPageLogo);
    }


}