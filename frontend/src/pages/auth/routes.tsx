import { ConfigRouteProps } from '@shared/types';

import { ResetPasswordPage } from './ResetPasswordPage';
import { ResetPasswordSubmitPage } from './ResetPasswordSubmitPage';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';

export const AuthRouter = {
    SignIn: '/signin',
    SignUp: '/signup',
    ResetPassword: '/reset',
    ResetPasswordSubmit: (token: string, userId: string) => `/reset/${token}/${userId}`,
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
    {
        path: AuthRouter.ResetPasswordSubmit(':token', ':userId'),
        withNoAuthGuard: true,
        element: <ResetPasswordSubmitPage />,
    },
];
