import { ConfigRouteProps } from '@shared/types';

import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';

export const AuthRouter = {
    SignIn: '/signin',
    SignUp: '/signup',
    RestorePassword: '/restore-password',
};

export const authRouteConfig: ConfigRouteProps[] = [
    {
        path: AuthRouter.SignIn,
        withNoAuthGuard: true,
        element: <SignInPage />,
    },
    {
        path: AuthRouter.SignUp,
        withNoAuthGuard: true,
        element: <SignUpPage />,
    },
];
