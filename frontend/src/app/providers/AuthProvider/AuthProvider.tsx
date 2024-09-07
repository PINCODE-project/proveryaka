import { Spin } from 'antd';
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { Token, TokenService, typedMemo } from '@shared/lib';

export type AuthContextProps = {
    login: (token: Token) => void;
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

    useEffect(() => {
        setIsAuth(TokenService.getToken() !== null);
        setIsLoading(false);
    }, []);

    const login = useCallback((token: Token) => {
        TokenService.setToken(token);
        setTimeout(() => setIsAuth(true), 500);
    }, []);

    const logout = useCallback(() => {
        setIsAuth(false);
        TokenService.removeToken();
    }, []);

    if (isLoading) {
        return (
            <div className="LoaderFallback">
                <Spin />
            </div>
        );
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
