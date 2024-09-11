import { FC, PropsWithChildren } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { AuthRouter } from '@pages/auth';
import { SpaceRouter } from '@pages/space';

import { typedMemo } from '@shared/lib';

type Props = PropsWithChildren & {
    withAuthGuard?: boolean;
    withNoAuthGuard?: boolean;
};

export const ProtectRoute: FC<Props> = typedMemo(function ProtectRoute({
    withAuthGuard,
    withNoAuthGuard,
    children,
}) {
    const { isAuth } = useAuthContext();
    const [searchParams] = useSearchParams();
    console.log(withAuthGuard, withNoAuthGuard, isAuth, window.location);
    if (withAuthGuard && !isAuth) {
        const encodeReturnUrl = encodeURIComponent(`${location.pathname}${location.search}`);
        return <Navigate to={`${AuthRouter.SignIn}?ReturnUrl=${encodeReturnUrl}`} />;
    }

    if (withNoAuthGuard && isAuth) {
        const returnUrl = searchParams.get('ReturnUrl');
        const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : SpaceRouter.Spaces;
        return <Navigate to={decodedReturnUrl} />;
    }

    return children;
});
