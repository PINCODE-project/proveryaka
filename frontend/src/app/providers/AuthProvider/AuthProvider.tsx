import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';

import { typedMemo } from '@shared/lib';
import { Loader } from '@shared/ui';

export type AuthContextProps = {
    login: () => void;
    logout: () => void;
    isAuth: boolean;
};

export const AuthProvider = createContext<AuthContextProps | null>(null);

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthProvider);

    if (context == null) {
        throw new Error('Used AuthContext without provider or before it');
    }

    return context;
};

export type AuthContextProviderProps = PropsWithChildren & {};

export const AuthContextProvider: FC<AuthContextProviderProps> = typedMemo(function UserContextProvider({
    children,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const login = useCallback(() => {
        setIsAuth(true);
    }, []);

    const logout = useCallback(() => {
        setIsAuth(false);
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <AuthProvider.Provider
            value={
                {
                    isAuth,
                    login,
                    logout,
                }
            }
        >
            {children}
        </AuthProvider.Provider>
    );
});
