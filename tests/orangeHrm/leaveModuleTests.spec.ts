import { test, expect } from '../../fixtures/OrangeHRM/orangeHrmFixture';
import { RandomDataGenerator } from '../../utils/randomdataGenerator';
import testData from "../../data/orangeHrm/testData.json";
import { LeavePage } from '../../pages/orangeHrm/LeavePage';
const { ValidleaveDetailsAuto,leaveWithPastTodate,ValidleaveDetailsManual} = testData.OrangeHRM;

test.describe("Leave Module Test cases", ()=>{
    test("Apply for leave with valid dates", async({authenticatedPage}) => {
        const uniqueComment = RandomDataGenerator.generateUniqueComment("LeaveTest");
        const leavePage = new LeavePage(authenticatedPage);
        await leavePage.launchUrlApplyLeave();
        await leavePage.applyLeave({... ValidleaveDetailsManual,comment:uniqueComment}); //overrides the comment value
        await leavePage.verifyToast("Success");
        await leavePage.launchUrlMyLeave();
        const returneddate =await leavePage.leaveStatus(uniqueComment,"");
    });

    test("Apply for leave with past to dates", async({authenticatedPage}) => {
        const uniqueComment = RandomDataGenerator.generateUniqueComment("LeaveTest");
        const leavePage = new LeavePage(authenticatedPage);
        await leavePage.launchUrlApplyLeave();
        await leavePage.applyLeave({... leaveWithPastTodate,comment:uniqueComment}); //overrides the comment value
        await leavePage.verifyRequiredError("To date should be after from date");
    });



})