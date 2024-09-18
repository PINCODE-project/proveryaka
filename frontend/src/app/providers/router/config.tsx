import { Button } from 'antd';
import { Navigate } from 'react-router-dom';

import { authRouteConfig, AuthRouter } from '@pages/auth';
import { spaceRouteConfig } from '@pages/space';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...authRouteConfig,
    ...spaceRouteConfig,
    {
        path: '*',
        withAuthGuard: true,
        element: <Navigate to={AuthRouter.SignIn} />,
    },
];
