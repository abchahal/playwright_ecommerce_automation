import { test, expect} from '../../fixtures/OrangeHRM/orangeHrmFixture';
import { EmployeePage } from '../../pages/orangeHrm/EmployeePage';
import { RandomDataGenerator } from '../../utils/randomdataGenerator';
import testData from "../../data/orangeHrm/testData.json";
import { csrfSessionLogin } from '../../utils/auth/csrfAuth';
import { OrangeHrmConfig, AuthData, EmployeeData } from '../../data/orangeHrm/apiTestData';
import { OrangeHrmApi } from '../../utils/apiRequests';
const { ValidemployeeDetails, empWithoutlastname,ContactDetails } = testData.OrangeHRM; 

test.describe("Employee UI + UI test scenarios", () => {
    test("Create Employee via API → Search and Verify in UI", async ({authenticatedPage}) =>{
        //Create employee via API
        const apiContext = await csrfSessionLogin(OrangeHrmConfig.baseURL,OrangeHrmConfig.endpoints.loginPage,OrangeHrmConfig.endpoints.validate,AuthData.valid.username,AuthData.valid.password);
        const api = new OrangeHrmApi(apiContext);
        const empNumber = await api.createEmployeeAndGetId(EmployeeData.valid);
        console.log(empNumber);
        //Search Employee on UI
        const employeepage = new EmployeePage(authenticatedPage);
        const returnedempNumber =await employeepage.validateEmpCreatedOnUI(empNumber);
        expect(Number(returnedempNumber)).toBe(empNumber);
    });

    test("Full Employee Lifecycle", async({authenticatedPage}) => {

        const apiContext = await csrfSessionLogin(OrangeHrmConfig.baseURL,OrangeHrmConfig.endpoints.loginPage,OrangeHrmConfig.endpoints.validate,AuthData.valid.username,AuthData.valid.password);
        const employeepage = new EmployeePage(authenticatedPage);
        const api = new OrangeHrmApi(apiContext);
        //Create new employee via API
        const empNumber = await api.createEmployeeAndGetId(EmployeeData.valid);
        //Validate on UI that employe created
        const returnedempNumber= await employeepage.validateEmpCreatedOnUI(empNumber);
        expect(Number(returnedempNumber)).toBe(empNumber);
        //Update contact details via UI
        await employeepage.updateEmpContact(ContactDetails.street1,ContactDetails.city, ContactDetails.country);
        //Validate contact details of employee via API post update
        const response = await api.getContactDetails(empNumber);
        console.log(response);
        //delete the contact via API
        const deleteStatus =await api.deleteEmpAPI(empNumber);
        expect(Number(deleteStatus)).toBe(200);
        //Validate emp is deleted on UI
        await employeepage.validateEmpDeleted(empNumber);
    })
})
