import {ApiError} from "../types/ApiError.ts";

const api = {
    baseUrl: import.meta.env.VITE_API_BASE_HOST_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },

    redirect: (endpoint: string) => {
        redirect(endpoint);
    },

    get: (endpoint: string, options: RequestInit = {}) =>
        apiFetch(endpoint, {
            ...options,
            method: 'GET'
        }),

    post: (endpoint: string, body: unknown, options: RequestInit = {}) =>
        apiFetch(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        }),

    put: (endpoint: string, body: unknown, options: RequestInit = {}) =>
        apiFetch(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body)
        }),

    patch: (endpoint: string, body: unknown, options: RequestInit = {}) =>
        apiFetch(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body)
        }),

    delete: (endpoint: string, options: RequestInit = {}) =>
        apiFetch(endpoint, {
            ...options,
            method: 'DELETE'
        })
}

async function redirect( endpoint: string ) {
    window.location.href = `${api.baseUrl}/${endpoint}`;
}

async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<unknown> {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const headers = {
            'Content-Type': 'application/json',
            ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
            ...(options.headers || {}),
        };

        const response = await fetch(`${api.baseUrl}/${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            const error = await response.json();
            throw new ApiError(response.status, error.errorDetails);
        }

        if (response.status === 204) {
            return;
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return await response.text();
    } catch (error) {
        const errorHttp = error as any;
        console.error(errorHttp);

        if (error instanceof Error && error.name === 'SyntaxError') {
            // avoid error when API return no json => undefined
            throw new Error('Error to handle no json return from API');
        }

        throw error;
    }
}

export default api;