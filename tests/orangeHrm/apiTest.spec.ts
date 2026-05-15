import { test, expect, APIRequestContext } from '@playwright/test';
import { csrfSessionLogin } from '../../utils/auth/csrfAuth';
import { getRequest, postRequest, disposeContext,createApiContext } from '../../utils/apiUtils';
import { OrangeHrmConfig, AuthData, EmployeeData } from '../../data/orangeHrm/apiTestData';
let apiContext: APIRequestContext;

test.describe('OrangeHRM Authentication Tests', () => {

    test('@API Valid credentials return access token', async () => {
        // Session login returns authenticated context
        const apiContext = await csrfSessionLogin(OrangeHrmConfig.baseURL, OrangeHrmConfig.endpoints.loginPage, OrangeHrmConfig.endpoints.validate, AuthData.valid.username, AuthData.valid.password);
        expect(apiContext).toBeDefined();
        await disposeContext(apiContext);
    });

    test('@API Invalid credentials fail login', async () => {
        try {
            const apiContext = await csrfSessionLogin(OrangeHrmConfig.baseURL, OrangeHrmConfig.endpoints.loginPage, OrangeHrmConfig.endpoints.validate, AuthData.invalid.username, AuthData.invalid.password);
            await disposeContext(apiContext);
            throw new Error('Expected login to fail but it succeeded');
        } catch (err: any) {
            // Verify the correct error was thrown
            expect(err.message).toContain('Login failed');
        }
    });

    test('@API GET employees without token should fail', async () => {

        const apiContext = await createApiContext(OrangeHrmConfig.baseURL);

        const response = await getRequest(apiContext, OrangeHrmConfig.endpoints.employees);

        expect(response.status).toBe(401);

        await disposeContext(apiContext);
    });

});


test.describe('Employee API Tests', () => {

    test.beforeAll(async () => {
        apiContext = await csrfSessionLogin(OrangeHrmConfig.baseURL, OrangeHrmConfig.endpoints.loginPage, OrangeHrmConfig.endpoints.validate, AuthData.valid.username, AuthData.valid.password);
    });

    test.afterAll(async () => {
        await disposeContext(apiContext);
    });

    test('@API Get employee list', async () => {
        const response = await getRequest(apiContext, OrangeHrmConfig.endpoints.employees);
        expect(response.status).toBe(200);
    });

    test('@API Create employee', async () => {

        const response = await postRequest(apiContext, OrangeHrmConfig.endpoints.employees, EmployeeData.valid);
        expect(response.status).toBe(200);
    });

    test('@API Create employee with missing last name', async () => {

        const response = await postRequest(apiContext, OrangeHrmConfig.endpoints.employees, EmployeeData.invalid);
        expect(response.status).toBe(422);
    });

    test('@API GET employees response time should be less than 5s', async () => {
        const startTime = Date.now();
        const response = await getRequest(apiContext, OrangeHrmConfig.endpoints.employees);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(`Response Time: ${responseTime} ms`);
        expect(responseTime).toBeLessThan(5000);
        expect(response.status).toBe(200);
    });



});