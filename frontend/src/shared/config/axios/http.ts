import axios from 'axios';

const BASE_API_URL = 'https://pincode-dev.ru/proverayka/';
export const ESTIMATE_API_URL = 'estimate-api/';
export const SOLUTION_API_URL = 'solution-api/';
export const SSO_API_URL = 'sso-api/';

export const http = axios.create({
    baseURL: BASE_API_URL,
});
