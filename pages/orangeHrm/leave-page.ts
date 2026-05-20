import { Locator, Page, expect } from "@playwright/test";
import { URLs } from "../../data/orangeHrm/baseurls";

// @ts-ignore
import { BasePage } from "../../fixtures/ReusableFixtures/BasePage";

export class LeavePage extends BasePage {
    readonly leaveType!: Locator;
    readonly leaveOption!: Locator;
    readonly dateFieldbtn!: Locator;
    readonly leaveComment!: Locator;
    readonly applyLeavebtn!: Locator;
    readonly toast!: Locator;
    readonly myLeaveList!: Locator;
    readonly errorMsg!: Locator;
    readonly requiredErr!: Locator;
    readonly loaderIcon!: Locator;

    constructor(page: Page) {
        super(page);
        this.leaveType = page.getByText('-- Select --');
        this.leaveOption = page.getByRole('option', { name: 'CAN - Personal' });
        this.dateFieldbtn = page.getByRole('textbox', { name: 'yyyy-dd-mm' });
        this.leaveComment = page.locator('textarea:visible');
        this.applyLeavebtn = page.getByRole('button', { name: 'Apply' });
        this.toast = page.locator('.oxd-toast');
        this.myLeaveList =page.locator(".oxd-table-card");
        this.errorMsg = page.locator(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message");
        this.requiredErr =page.locator(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message") ;
        this.loaderIcon = page.locator('.oxd-form-loader');
    };

    async launchUrlApplyLeave(): Promise<void> {
        // Remove '/auth/login' from BASEURL to get the root, then append ADD_EMPLOYEE
        const base = URLs.OrangeHRM.BASEURL.replace('/auth/login', '');
        await this.navigateTo(base + URLs.OrangeHRM.APPLY_LEAVES);
        await this.loaderIcon.waitFor({ state: 'hidden', timeout: 10000 });
    }

    async launchUrlMyLeave(): Promise<void> {
        // Remove '/auth/login' from BASEURL to get the root, then append ADD_EMPLOYEE
        const base = URLs.OrangeHRM.BASEURL.replace('/auth/login', '');
        await this.navigateTo(base + URLs.OrangeHRM.MY_LEAVES);
         await this.page.waitForLoadState('networkidle');
         await this.loaderIcon.waitFor({ state: 'hidden', timeout: 10000 });
    }

    async applyLeave(leaveData: {
        fromDate?: string | null;  // optional - defaults to today
        toDate?: string | null;    // optional - defaults to today
        comment?: string | null;
    }) {

        // OrangeHRM format: yyyy-dd-mm
        const today = new Date();
        const yyyy = today.getFullYear();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const todayFormatted = `${yyyy}-${dd}-${mm}`; // e.g. 2026-14-05

        //if data is not passed thorugh leavedata then by default today's date will be picked.
        const fromDate = leaveData.fromDate || todayFormatted;
        const toDate = leaveData.toDate || todayFormatted;
       await this.loaderIcon.waitFor({ state: 'hidden', timeout: 10000 });
       await this.page.waitForLoadState('networkidle');
        await this.click(this.leaveType);
        await this.click(this.leaveOption);

        await this.fillDate(this.dateFieldbtn.nth(0), fromDate);

        await this.fillDate(this.dateFieldbtn.nth(1), toDate);
        if (leaveData.comment) {
            await this.fill(this.leaveComment,leaveData.comment);
        }
        await this.click(this.applyLeavebtn); 
    };

    async fillDate(dateField: Locator, date: string) {
        await dateField.click();
        await dateField.clear();
        await dateField.fill(date);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(300);
    };

    async verifyToast(message: string) {
        await this.verifyToastMessage(this.toast, message);
    }

    async verifyRequiredError(message: string) {
        await this.verifyErrorMessage(this.requiredErr, message);
    }
    async leaveStatus(uniqueComment: string, expectedStatus: string): Promise<void> {
        const matchingRow = this.myLeaveList.filter({has: this.page.locator(`text=${uniqueComment}`)});
        await expect(matchingRow).toBeVisible();
        await expect(matchingRow).toContainText(expectedStatus);
    }

}