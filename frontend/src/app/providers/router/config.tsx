import { Button } from 'antd';
import { Navigate } from 'react-router-dom';

import { authRouteConfig, AuthRouter } from '@pages/auth';

import { UserEditor } from '@widgets/UserEditor';

import { ConfigRouteProps } from '@shared/types';

export const routeConfig: ConfigRouteProps[] = [
    ...authRouteConfig,
    {
        path: '*',
        withAuthGuard: true,
        element: <UserEditor triggerComponent={onOpen => <Button onClick={onOpen}>adwdaw</Button>} />,
    },
];
