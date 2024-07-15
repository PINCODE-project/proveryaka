import { InternalAxiosRequestConfig } from 'axios';

import { TokenService } from '@shared/lib';

/**
 * Интерсептор для добавления токена авторизации
 * @param config Конфиг запроса
 */
export function addTokenInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = TokenService.getToken();
    if (token === null) {
        return config;
    }

    config.headers.set('Authorization', `Bearer ${token.access_token}`);
    return config;
}
