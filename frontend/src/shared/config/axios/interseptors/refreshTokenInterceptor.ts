import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenService } from '@shared/lib';

export type RefreshResult = Promise<AxiosResponse<unknown, unknown>>;

/**
 * Интерсептор обновления токена
 * @param error Ошибка запроса
 * @param refreshCallback Коллбек для повтора запроса
 */
export function refreshSecretInterceptor(error: AxiosError)/*: RefreshResult */ {
    console.log(error);
    if (error.code !== 'ERR_NETWORK') {
        throw error;
    }

    return refreshSecret(error);
}

const refreshSecret = async (requestError: AxiosError)/* RefreshResult */ => {
    const secret = TokenService.getToken();
    if (secret === null || requestError.config === undefined) {
        throw requestError;
    }

    /* try {
        const newSecret = await AuthService.refreshSecret(secret);
		UserSecretService.saveToken(newSecret);
		return http.request(requestError.config);
    } catch (error: unknown) {
        AuthService.disconnect();
        throw error;
    } */
};
