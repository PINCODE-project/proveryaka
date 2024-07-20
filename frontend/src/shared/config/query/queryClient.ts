import { isAxiosError } from 'axios';
import { QueryClient } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

// @ts-ignore
export const getQueryClient = (logout: () => void, navigate: NavigateFunction) => new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            onError: error => {
                if (!isAxiosError(error)) {
                    return;
                }
                switch (error.response?.status) {
                    case 401:
                        logout();
                        break;
                    case 404:
                        navigate(-1);
                        break;
                }
            },
            retry: 0,
        },
        mutations: {
            onError: error => {
                if (isAxiosError(error) && error.response?.status === 401) {
                    logout();
                }
            },
            retry: 0,
        },
    },
});
