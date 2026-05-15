export const OrangeHrmConfig = {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    endpoints: {
        loginPage:  '/web/index.php/auth/login',        // GET - to extract CSRF token
        validate:   '/web/index.php/auth/validate',     // POST - session login
        employees:  '/web/index.php/api/v2/pim/employees'
    }
};

export const AuthData = {
    valid:   { username: 'Admin', password: 'admin123' },
    invalid: { username: 'Admin', password: 'wrongpassword' }
};

export const EmployeeData = {
    valid: { firstName: 'John', middleName: '', lastName: 'TestAuto' },
    invalid: { firstName: 'John', middleName: '', lastName: '' }
};

