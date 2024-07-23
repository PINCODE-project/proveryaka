import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { refreshToken } from '@features/auth/refresh-token';

import { ssoHttp } from '@shared/config/axios';
import { extractData, Token, TokenService } from '@shared/lib';

/**
 * Интерсептор обновления токена
 * @param error Ошибка запроса
 * @param refreshCallback Коллбек для повтора запроса
 */
export function refreshSecretInterceptor(error: AxiosError)/*: RefreshResult */ {
    if (error.code !== 'ERR_NETWORK') {
        throw error;
    }

    return refreshSecretInner(error);
}

const refreshSecretInner = async (requestError: AxiosError)/* RefreshResult */ => {
    const secret = TokenService.getToken();
    if (secret === null || requestError.config === undefined) {
        throw requestError;
    }

    try {
        const newSecret = await refreshToken();
        if (!newSecret) {
            throw requestError;
        }

        TokenService.setToken(newSecret);
        return ssoHttp.request(requestError.config);
    } catch (error: unknown) {
        TokenService.removeToken();
        throw error;
    }
};
