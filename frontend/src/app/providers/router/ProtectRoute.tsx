import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { SpaceRouter } from '@pages/spaces';

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
    const navigate = useNavigate();
    const { isAuth } = useAuthContext();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!withAuthGuard && !withNoAuthGuard) {
            return;
        }

        if (withAuthGuard && !isAuth) {
            const encodeReturnUrl = encodeURIComponent(`${location.pathname}${location.search}`);
            navigate(`${/* TODO: LOGIN URL */ '/auth'}?ReturnUrl=${encodeReturnUrl}`);
        } else if (withNoAuthGuard && isAuth) {
            const returnUrl = searchParams.get('ReturnUrl');
            const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : SpaceRouter.Main;
            navigate(decodedReturnUrl);
        }
    }, [isAuth]);

    return children;
});
