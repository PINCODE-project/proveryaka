import { Navigate } from 'react-router-dom';

import { authRouteConfig } from '@pages/auth';
import { spacesRouteConfig } from '@pages/spaces';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...spacesRouteConfig,
    ...authRouteConfig,
    {
        path: '*',
        element: <Navigate to="/spaces" />,
    },
];
