import { isAxiosError } from 'axios';
import { QueryClient, QueryCache, MutationCache } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

// @ts-ignore
export const getQueryClient = (logout: () => void, navigate: NavigateFunction) => new QueryClient({
    queryCache: new QueryCache({
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
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                logout();
            }
        },
    }),
    defaultOptions: {
        queries: {
            suspense: true,
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});
