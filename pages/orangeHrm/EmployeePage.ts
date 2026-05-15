import { Locator, Page, expect } from "@playwright/test";
import { URLs } from "../../data/orangeHrm/baseUrls";

// @ts-ignore
import { BasePage } from "../../fixtures/ReusableFixtures/BasePage";

export class EmployeePage extends BasePage {
    readonly firstname!: Locator;
    readonly lastname!: Locator;
    readonly empId!: Locator;
    readonly toast!: Locator;
    readonly saveBtn !: Locator;
    readonly requiredErr !: Locator;
    readonly empListbtn!: Locator;
    readonly searchBtn !: Locator
    readonly returnedresult !: Locator;
    readonly deleteIcon!: Locator;
    readonly confirmDelete!: Locator;
    readonly searchEmpId!: Locator;
    readonly firstResultEmpId!: Locator;
    readonly contactBtn!: Locator;
    readonly street1!: Locator;
    readonly city !: Locator;
    readonly countryDropdown!: Locator;
    readonly countryOptions!: Locator;
    readonly countryList!: Locator;

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
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDelete = page.locator('i.oxd-icon.bi-trash.oxd-button-icon')
        this.contactBtn = page.getByRole('link', { name: 'Contact Details' });
        this.street1 = page.locator('.oxd-input-group').filter({ hasText: 'Street 1' }).getByRole('textbox');
        this.city = page.locator('.oxd-input-group').filter({ hasText: 'City' }).getByRole('textbox');
        this.countryDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Country' }).locator('.oxd-select-text-input');
        this.countryList = page.locator('[role="listbox"]')
        this.countryOptions = page.locator('[role="listbox"]').getByRole('option');
    }


    async launchUrlAddEmp(): Promise<void> {
        // Remove '/auth/login' from BASEURL to get the root, then append ADD_EMPLOYEE
        const base = URLs.OrangeHRM.BASEURL.replace('/auth/login', '');
        await this.navigateTo(base + URLs.OrangeHRM.ADD_EMPLOYEE);
    }

    async addEmpDetailsAndSave(firstname: string, lastname: string, empId: number, waitForSuccess: boolean = false) {
        await this.fill(this.firstname, firstname);
        await this.fill(this.lastname, lastname);
        await this.fill(this.empId, empId.toString());
        await this.saveBtn.waitFor({ state: 'visible' });
        await this.click(this.saveBtn);
        if (waitForSuccess) {
            await this.toast.waitFor({
                state: 'visible',
                timeout: 10000
            });
        }

        await this.page.waitForLoadState('networkidle');
        return empId;
    };

    async updateEmpContact(street1: string, city: string, country: string) {
        await this.contactBtn.waitFor({ state: 'visible' });
        await this.click(this.contactBtn);
        await this.street1.waitFor({ state: 'visible' });
        await this.fill(this.street1, street1);
        await this.fill(this.city, city);
        await this.click(this.countryDropdown);
        await this.countryList.waitFor({ state: 'visible' });
        await this.countryOptions.allTextContents();
        await this.click(this.countryOptions.filter({ hasText: country }));
        await this.click(this.saveBtn);
        await this.toast.waitFor({ state: 'visible', timeout: 10000 });
    };

    async verifyToast(message: string) {
        await this.verifyToastMessage(this.toast, message);
    }
    async verifyRequiredError(message: string) {
        await this.verifyErrorMessage(this.requiredErr, message);
    }

    async searchEmployee(empDetails: number) {
        await this.click(this.empListbtn);
        await this.page.waitForLoadState('networkidle');
        await this.searchEmpId.waitFor({state:'visible'});
        await this.fill(this.searchEmpId, empDetails.toString());
        await this.click(this.searchBtn);
        await this.page.waitForLoadState('networkidle');
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