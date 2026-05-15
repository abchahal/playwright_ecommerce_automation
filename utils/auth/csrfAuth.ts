import { APIRequestContext, request } from '@playwright/test';

// ─── CSRF Session Login (OrangeHRM specific) ──────────────────────
export async function csrfSessionLogin(
    baseURL: string,
    loginPageEndpoint: string,
    validateEndpoint: string,
    username: string,
    password: string
): Promise<APIRequestContext> {

    const apiContext = await request.newContext({ baseURL });

    console.log('\n======= CSRF LOGIN =======');

    // Step 1: Load login page
    const loginPage = await apiContext.get(loginPageEndpoint);
    const html = await loginPage.text();

    // Step 2: Extract CSRF token
    const tokenMatch = html.match(/:token="&quot;([^&]+)&quot;"/);

    if (!tokenMatch) {
        throw new Error('CSRF token not found in login page');
    }

    const csrfToken = tokenMatch[1];
    console.log(`CSRF Token extracted: ${csrfToken.substring(0, 20)}...`);

    // Step 3: Submit login request
    const loginResponse = await apiContext.post(validateEndpoint, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            _token: csrfToken,
            username,
            password
        }
    });

    const finalUrl = loginResponse.url();
    console.log(`Final URL: ${finalUrl}`);

    // Step 4: Validate login success
    if (finalUrl.includes('/auth/login')) {
        throw new Error(`Login failed for user: ${username}`);
    }

    console.log('Session established successfully');
    console.log('=============================\n');

    return apiContext;
}