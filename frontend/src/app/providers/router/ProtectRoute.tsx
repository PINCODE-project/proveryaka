import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from '@app/providers/AuthProvider';

import { typedMemo } from '@shared/lib';

type Props = PropsWithChildren & {};

export const ProtectRoute: FC<Props> = typedMemo(function ProtectRoute({
    children,
}) {
    const navigate = useNavigate();
    const { isAuth } = useAuthContext();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const isAuthRoute = location.pathname.includes(/* TODO: AUTH PREFIX */ '/auth');
        if (isAuth) {
            if (!isAuthRoute) {
                return;
            }

            const returnUrl = searchParams.get('ReturnUrl');
            const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : /* TODO: MAIN URL */'/';
            navigate(decodedReturnUrl);
        } else {
            if (isAuthRoute) {
                return;
            }

            const encodeReturnUrl = encodeURIComponent(`${location.pathname}${location.search}`);
            navigate(`${/* TODO: LOGIN URL */ '/auth'}?ReturnUrl=${encodeReturnUrl}`);
        }
    }, [isAuth]);

    return children;
});
