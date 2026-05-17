import { APIRequestContext, request } from '@playwright/test';

// ─── Logger Helpers ───────────────────────────────────────────────
function logRequest(method: string, endpoint: string, data?: object, token?: string) {
    console.log('\n======= REQUEST =======');
    console.log(`Method   : ${method}`);
    console.log(`Endpoint : ${endpoint}`);
    console.log(`Token    : ${token ?? 'None'}`);
    console.log(`Body     : ${data ? JSON.stringify(data, null, 2) : 'None'}`);
    console.log('=======================');
}

function logResponse(status: number, body: any) {
    console.log('\n======= RESPONSE =======');
    console.log(`Status   : ${status}`);
    console.log(`Body     : ${JSON.stringify(body, null, 2)}`);
    console.log('========================\n');
}

// ─── Safe Response Parser ─────────────────────────────────────────
async function parseResponse(response: any) {
    let body: any = null;
    try {
        body = await response.json();
    } catch {
        body = await response.text();
    }
    return { status: response.status(), body };
}

// ─── Create API Context ───────────────────────────────────────────
export async function createApiContext(baseURL: string): Promise<APIRequestContext> {
    return await request.newContext({ baseURL });
}


// ─── GET ──────────────────────────────────────────────────────────
export async function getRequest(apiContext: APIRequestContext, endpoint: string, token?: string) {
    logRequest('GET', endpoint, undefined, token);
    const response = await apiContext.get(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
    const result = await parseResponse(response);
    logResponse(result.status, result.body);
    return result;
}

// ─── POST (JSON) ──────────────────────────────────────────────────
export async function postRequest(apiContext: APIRequestContext, endpoint: string, data: object, token?: string) {
    logRequest('POST', endpoint, data, token);
    const response = await apiContext.post(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        data
    });
    const result = await parseResponse(response);
    logResponse(result.status, result.body);
    return result;
}

// ─── POST (Form) ──────────────────────────────────────────────────
export async function formRequest(apiContext: APIRequestContext, endpoint: string, formData: object) {
    logRequest('POST (form)', endpoint, formData);
    const response = await apiContext.post(endpoint, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: formData as Record<string, string>
    });
    const result = await parseResponse(response);
    logResponse(result.status, result.body);
    return result;
}

// ─── PUT ──────────────────────────────────────────────────────────
export async function putRequest(apiContext: APIRequestContext, endpoint: string, data: object, token?: string) {
    logRequest('PUT', endpoint, data, token);
    const response = await apiContext.put(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        data
    });
    const result = await parseResponse(response);
    logResponse(result.status, result.body);
    return result;
}

// ─── DELETE ───────────────────────────────────────────────────────
export async function deleteRequest(apiContext: APIRequestContext, endpoint: string,data?: object, token?: string) {
    logRequest('DELETE', endpoint, undefined, token);
    const response = await apiContext.delete(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        data
    });
    const result = await parseResponse(response);
    logResponse(result.status, result.body);
    return result;
}

// ─── Dispose ──────────────────────────────────────────────────────
export async function disposeContext(apiContext: APIRequestContext): Promise<void> {
    await apiContext.dispose();
}