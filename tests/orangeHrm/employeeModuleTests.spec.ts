import { test, expect } from '../../fixtures/OrangeHRM/orangeHrmFixture';
import { EmployeePage } from '../../pages/orangeHrm/EmployeePage';
import { RandomDataGenerator } from '../../utils/randomdataGenerator';
import testData from "../../data/orangeHrm/testData.json";

const { ValidemployeeDetails, empWithoutlastname } = testData.OrangeHRM;

test.describe("Employee Module test cases", () => {

    test("Add new employee with mandatory fields", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empId = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        const empDetails = await employeePage.addEmpDetailsAndSave(ValidemployeeDetails.firstname, ValidemployeeDetails.lastname, empId);
        expect(empId).toBe(empDetails);
        await employeePage.verifyToast("Success");
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
        console.log(empDetails);
        await employeePage.searchEmployee(empDetails);
        const result = await employeePage.getFirstResult();
        expect(Number(result)).toBe(empId);
        await employeePage.validateSingleResult();

    });

    test("Search employee with non-existent empID", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empDetails = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        await employeePage.searchEmployee(empDetails);
        await employeePage.validateNoResult();
    });

     test("Delete an existing employee", async ({ authenticatedPage }) => {
        const employeePage = new EmployeePage(authenticatedPage);
        const empId = RandomDataGenerator.generate4DigitEmpId();
        await employeePage.launchUrlAddEmp();
        const empDetails = await employeePage.addEmpDetailsAndSave(ValidemployeeDetails.firstname, ValidemployeeDetails.lastname, empId);
        await employeePage.verifyToast("Success");
        await employeePage.searchEmployee(empDetails);
        await employeePage.deleteEmployee();
         await employeePage.verifyToast("Success");
    });

})

