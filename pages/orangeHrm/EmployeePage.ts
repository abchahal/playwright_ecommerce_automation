import { Locator, Page } from "@playwright/test";
import { URLs } from "../../data/orangeHrm/baseUrls";

// @ts-ignore
import { BasePage } from "../../fixtures/ReusableFixtures/BasePage";

export class EmployeePage extends BasePage {
    readonly pimBtn!: Locator;
    readonly firstname!: Locator;
    readonly lastname!: Locator;
    readonly empId!: Locator;
    readonly toast!: Locator;
    readonly saveBtn !: Locator;
    readonly requiredErr !: Locator;
    readonly empListbtn! : Locator;
    readonly searchBtn !: Locator
    readonly returnedresult !: Locator;
    result!: number;

    constructor(page: Page) {
        super(page);
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.empId = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.toast = page.locator('.oxd-toast');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.requiredErr = page.getByText('Required', { exact: true });
        this.empListbtn = page.getByRole('link', { name: 'Employee List' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.returnedresult =page.locator("div[class='oxd-table-card'] div:nth-child(2) div:nth-child(1)");

    };
    async launchUrlAddEmp(): Promise<void> {
        // Remove '/auth/login' from BASEURL to get the root, then append ADD_EMPLOYEE
        const base = URLs.OrangeHRM.BASEURL.replace('/auth/login', '');
        await this.navigateTo(base + URLs.OrangeHRM.ADD_EMPLOYEE);
    }

    async addEmpDetailsAndSave(firstname: string, lastname: string, empId: number) {
        await this.fill(this.firstname, firstname);
        await this.fill(this.lastname, lastname);
        await this.fill(this.empId, empId.toString());
        await this.saveBtn.waitFor({ state: 'visible' });
        await this.click(this.saveBtn);
        return empId;
    }

    async verifyErrorToast(message: string) {
        await this.verifyToastMessage(this.toast, message);
    }
    async verifyRequiredError(message: string) {
        await this.verifyErrorMessage(this.requiredErr, message);
    }

    async searchEmployee(empId: number){
        await this.click(this.empListbtn);
        await this.fill(this.empId,empId.toString());
        await this.click(this.searchBtn);
        const result= await this.getText(this.returnedresult);
        return Number(result);

    }


}