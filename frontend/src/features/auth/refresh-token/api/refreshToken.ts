import { ssoHttp } from '@shared/config/axios';
import { extractData, Token, TokenService } from '@shared/lib';

export function refreshToken(): Promise<Token | null> {
    const token = TokenService.getToken();

    if (!token) {
        return Promise.resolve(null);
    }
    return ssoHttp.post<Token>('connect/token', {
        client_id: 'client',
        client_secret: 'pin-code',
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(extractData);
}
