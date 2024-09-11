import axios from 'axios';

import { addTokenInterceptor } from '@shared/config/axios/interseptors/addTokenInterceptor';
import { notifyError } from '@shared/config/axios/interseptors/notifyError';
import { refreshSecretInterceptor } from '@shared/config/axios/interseptors/refreshTokenInterceptor';

const BASE_API_URL = 'https://dev.pincode-dev.ru/proverayka/';

export const estimateHttp = axios.create({
    baseURL: `${BASE_API_URL}estimate-api/api/v1/public`,
    headers: {
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

estimateHttp.interceptors.request.use(config => addTokenInterceptor(config),
    error => Promise.reject(error));

estimateHttp.interceptors.response.use(response => response,
    error => {
        notifyError(error);
        refreshSecretInterceptor(error);
    });

export const solutionHttp = axios.create({
    baseURL: `${BASE_API_URL}solution-api/api/v1/public`,
    headers: {
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

solutionHttp.interceptors.request.use(config => addTokenInterceptor(config),
    error => Promise.reject(error));

solutionHttp.interceptors.response.use(response => response,
    error => {
        notifyError(error);
        refreshSecretInterceptor(error);
    });

export const ssoHttp = axios.create({
    baseURL: `${BASE_API_URL}sso`,
    headers: {
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

ssoHttp.interceptors.request.use(config => addTokenInterceptor(config),
    error => Promise.reject(error));

ssoHttp.interceptors.response.use(response => response,
    error => {
        notifyError(error);
        refreshSecretInterceptor(error);
    });
