import { isAxiosError } from 'axios';
import { QueryClient } from 'react-query';

// @ts-ignore
export const getQueryClient = (logout: () => void) => new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: true,
            onError: error => {
                if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
                    logout();
                }
            },
            retry: 0,
        },
        mutations: {
            onError: error => {
                if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
                    logout();
                }
            },
            retry: 0,
        },
    },
});
