import { APIRequestContext, expect } from '@playwright/test';
import { getRequest, postRequest, disposeContext,createApiContext, deleteRequest } from '../utils/apiUtils';
import { OrangeHrmConfig, EmployeeData } from '../data/orangeHrm/api-test-data';

export class OrangeHrmApi {

    constructor(private apiContext: APIRequestContext) {}

    async createEmployee(payload : any) {
        const response = await postRequest(this.apiContext,OrangeHrmConfig.endpoints.employees,payload);
        const empId =
            response.body?.data?.employeeId ||
            response.body?.data?.empNumber ||
            response.body?.empNumber;

        return {
        status: response.status,
        body: response.body,
        empId: empId
    };

    }

    async createEmployeeAndGetId(payload : any) {
        const res = await this.createEmployee(payload);
       return res.empId;
    }

    async getEmployeeAPI(){
        const response = await getRequest(this.apiContext,OrangeHrmConfig.endpoints.employees);
        expect(response.status).toBe(200);
        return response;
    }

    async getContactDetails(empNumber: string){
        const response = await getRequest(this.apiContext,OrangeHrmConfig.endpoints.contactDetails(empNumber));
        const street1 = response.body?.data?.street1;
        const city = response.body?.data?.city;
        const countryCode = response.body?.data?.countryCode;
        return {
            status: response.status,
            body: response.body,
            street1: street1,
            city: city,
            country: countryCode
        }
    };

    async deleteEmpAPI(empNumber: any){
        const payload = {ids: [empNumber]};
        const response = await deleteRequest(this.apiContext,OrangeHrmConfig.endpoints.employees,payload);
        return response.status;

    }

}