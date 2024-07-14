import { Navigate } from 'react-router-dom';

import { spacesRouteConfig } from '@pages/spaces';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...spacesRouteConfig,
    {
        path: '*',
        element: <Navigate to="/spaces" />,
    },
];
