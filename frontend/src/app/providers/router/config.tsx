import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    {
        path: '*',
        element: <p style={{ color: 'red' }}>Not found page</p>,
    },
];
