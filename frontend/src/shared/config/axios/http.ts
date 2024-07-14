import axios from 'axios';

import { TokenService } from '@shared/lib';

const BASE_API_URL = 'https://pincode-dev.ru/proverayka/';

export const estimateHttp = axios.create({
    baseURL: `${BASE_API_URL}estimate-api/api/v1/public`,
});

// @ts-expect-error Все верно
estimateHttp.interceptors.request.use(function(config) {
    const token = TokenService.getToken();

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token?.access_token}`,
        },
    };
});

export const solutionHttp = axios.create({
    baseURL: `${BASE_API_URL}solution-api/api/v1/public`,
});

// @ts-expect-error Все верно
solutionHttp.interceptors.request.use(function(config) {
    const token = TokenService.getToken();

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token?.access_token}`,
        },
    };
});

export const ssoHttp = axios.create({
    baseURL: `${BASE_API_URL}sso`,
});

// @ts-expect-error Все верно
ssoHttp.interceptors.request.use(function(config) {
    const token = TokenService.getToken();

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token?.access_token}`,
        },
    };
});
