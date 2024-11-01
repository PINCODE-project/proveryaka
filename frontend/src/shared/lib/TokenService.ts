export type Token = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
};

export namespace TokenService {
    const tokenKey = 'token';

    export function getToken(): Token | null {
        const tokenJson = localStorage.getItem(tokenKey);
        return tokenJson && JSON.parse(tokenJson);
    }

    export function setToken(token: Token) {
        localStorage.setItem(tokenKey, JSON.stringify(token));
    }

    export function removeToken() {
        localStorage.removeItem(tokenKey);
    }
}
