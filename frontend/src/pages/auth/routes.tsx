import { ConfigRouteProps } from '@shared/types';

import { ResetPasswordPage } from './ResetPasswordPage';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';

export const AuthRouter = {
    SignIn: '/signin',
    SignUp: '/signup',
    ResetPassword: '/reset-password',
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
    {
        path: AuthRouter.ResetPassword,
        withNoAuthGuard: true,
        element: <ResetPasswordPage />,
    },
];
