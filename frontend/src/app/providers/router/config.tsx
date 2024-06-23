import { spacesRouteConfig } from '@pages/spaces';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...spacesRouteConfig,
    {
        path: '*',
        element: <p style={{ color: 'red' }}>Not found page</p>,
    },
];
