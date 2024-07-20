import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getQueryClient } from '@shared/config/query';
import { typedMemo } from '@shared/lib';

import { useAuthContext } from '../AuthProvider';

export type Props = PropsWithChildren;

export const QueryProvider: FC<Props> = typedMemo(function QueryProvider({ children }) {
    const navigate = useNavigate();
    const { logout } = useAuthContext();
    const queryClient = useMemo(() => getQueryClient(logout, navigate), [logout]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
});
