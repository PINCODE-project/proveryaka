import { isAxiosError } from 'axios';
import { QueryClient } from 'react-query';

// @ts-ignore
export const getQueryClient = (logout: () => void) => new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: true,
            onError: error => {
                // @ts-ignore Так надо
                console.log(error);
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            },
            retry: 0,
        },
        mutations: {
            onError: error => {
                console.log(error);
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            },
            retry: 0,
        },
    },
});
