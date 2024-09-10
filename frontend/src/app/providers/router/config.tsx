import { Navigate } from 'react-router-dom';

import { authRouteConfig, AuthRouter } from '@pages/auth';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...authRouteConfig,
    {
        path: '*',
        element: <Navigate to={AuthRouter.SignIn} />,
    },
];
