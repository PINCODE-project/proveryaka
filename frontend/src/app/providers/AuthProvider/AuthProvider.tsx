import { Flex, Spin } from 'antd';
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthRouter } from '@pages/auth';

import { refreshToken } from '@features/auth/refresh-token';

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

export type AuthContextProviderProps = PropsWithChildren;

export const AuthContextProvider: FC<AuthContextProviderProps> = typedMemo(function UserContextProvider({
    children,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const login = useCallback((token: Token) => {
        TokenService.setToken(token);
        setTimeout(() => setIsAuth(true), 500);
    }, []);

    const logout = useCallback(() => {
        setIsAuth(false);
        TokenService.removeToken();
    }, []);

    const setInitialAuth = useCallback(async () => {
        let token: null | Token = TokenService.getToken();

        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            token = await refreshToken();
            if (token) {
                TokenService.setToken(token);
                setIsAuth(true);
            }
        } catch {
            TokenService.removeToken();
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setInitialAuth();
    }, [setInitialAuth]);

    if (isLoading) {
        return (
            <Flex
                align="center"
                justify="center"
                className="LoaderFallback"
            >
                <Spin size="large" />
            </Flex>
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
