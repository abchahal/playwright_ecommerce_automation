import { test, expect } from '../../fixtures/OrangeHRM/orangeHrmFixture';
import { EmployeePage } from '../../pages/orangeHrm/EmployeePage';
import { RandomDataGenerator } from '../../utils/randomdataGenerator';
import testData from "../../data/orangeHrm/testData.json";
import { URLs } from "../../data/orangeHrm/baseUrls";
const { ValidemployeeDetails, empWithoutlastname } = testData.OrangeHRM;

test.describe("Employee Module test cases", () => {

    test("Add new employee with mandatory fields", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empId = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        const empDetails = await employeePage.addEmpDetailsAndSave(ValidemployeeDetails.firstname, ValidemployeeDetails.lastname, empId);
        expect(empId).toBe(empDetails);
        await employeePage.verifyErrorToast("Success");

    });

    test("Adding new employee without last name", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empId = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        const empDetails = await employeePage.addEmpDetailsAndSave(empWithoutlastname.firstname, empWithoutlastname.lastname, empId);
        expect(empId).toBe(empDetails);
        await employeePage.verifyRequiredError("Required");
    });

    test("Search employee by name", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empId = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        const empDetails = await employeePage.addEmpDetailsAndSave(ValidemployeeDetails.firstname, ValidemployeeDetails.lastname, empId);
        expect(empId).toBe(empDetails);
        await employeePage.verifyErrorToast("Success");
        const result =await employeePage.searchEmployee(empDetails);
        expect(result).toBe(empDetails);



    });


})

