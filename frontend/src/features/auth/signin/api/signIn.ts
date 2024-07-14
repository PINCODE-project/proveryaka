import { ssoHttp } from '@shared/config/axios';
import { extractData, Token } from '@shared/lib';

import { SignIn } from '../model/SignIn';

export function signIn(body: SignIn): Promise<Token> {
    console.log(body);
    return ssoHttp.post<Token>('connect/token', {
        ...body,
        client_id: 'client',
        client_secret: 'pin-code',
        grant_type: 'password',
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(extractData);
}
