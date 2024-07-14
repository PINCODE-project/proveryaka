import { isAxiosError } from 'axios';
import { QueryClient } from 'react-query';

export const getQueryClient = (logout: () => void) => new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            onError: error => {
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            },
        },
        mutations: {
            onError: error => {
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            },
        },
    },
});
