import { Locator, Page, expect } from "@playwright/test";
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
    readonly empListbtn!: Locator;
    readonly searchBtn !: Locator
    readonly returnedresult !: Locator;
    result!: number;
    readonly numberOfEmpfound!: Locator;
    readonly deleteIcon!: Locator;
    readonly confirmDelete!: Locator;
    readonly loaderIcon!: Locator;
    readonly searchEmpId!:Locator;
    readonly firstResultEmpId!: Locator;

    constructor(page: Page) {
        super(page);
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.empId = page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.searchEmpId = page.locator('.oxd-input-group.oxd-input-field-bottom-space input.oxd-input');
        this.toast = page.locator('.oxd-toast');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.requiredErr = page.getByText('Required', { exact: true });
        this.empListbtn = page.getByRole('link', { name: 'Employee List' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.returnedresult = page.locator(".oxd-table-card");
        this.firstResultEmpId = page.locator('.oxd-table-body .oxd-table-row').first().locator('.oxd-table-cell').nth(1);
        this.numberOfEmpfound = page.getByText('(1) Record Found', { exact: true });
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDelete = page.locator('i.oxd-icon.bi-trash.oxd-button-icon')
        this.loaderIcon = page.locator('.oxd-form-loader');
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
        await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**', { timeout: 30000 });
    
        return empId;
    }

    async verifyToast(message: string) {
        await this.verifyToastMessage(this.toast, message);
    }
    async verifyRequiredError(message: string) {
        await this.verifyErrorMessage(this.requiredErr, message);
    }

    async searchEmployee(empDetails: number) {
        await this.click(this.empListbtn);
        await this.page.waitForLoadState('networkidle');
        await this.fill(this.searchEmpId, empDetails.toString());
        await this.click(this.searchBtn);
        await this.page.waitForLoadState('networkidle');
        const cards = await this.page.locator('.oxd-table-card').count();
        console.log(`Cards found after search: ${cards}`);
    }
    async getFirstResult(): Promise<string | null> {
        await this.firstResultEmpId.waitFor({ state: 'visible', timeout: 30000 });
        return (await this.firstResultEmpId.textContent())?.trim() || '';
    }
    async validateSingleResult() {
        await expect(this.returnedresult).toHaveCount(1);
    }

    async validateNoResult() {
        await expect(this.returnedresult).toHaveCount(0);
    }

    async deleteEmployee() {
        await this.click(this.deleteIcon);
        await this.click(this.confirmDelete);

    }


}