import axios from 'axios';

const BASE_API_URL = 'https://pincode-dev.ru/proverayka/';

export const estimateHttp = axios.create({
    baseURL: `${BASE_API_URL}/estimate-api/api/v1/public`,
});

export const solutionHttp = axios.create({
    baseURL: `${BASE_API_URL}/solution-api/api/v1/public`,
});

export const ssoHttp = axios.create({
    baseURL: `${BASE_API_URL}/sso-api/api/v1/public`,
});
