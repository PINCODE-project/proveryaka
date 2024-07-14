import { signIn } from '@features/auth/signin';

import { estimateHttp } from '@shared/config/axios';
import { extractData, Token } from '@shared/lib';

import { SignUp } from '../model/SignUp';

export function signUp(body: SignUp): Promise<Token> {
    return estimateHttp.post<Token>('anonymous/user/register', {
        ...body,
        client_id: 'client',
        client_secret: 'pin-code',
        grant_type: 'password',
    })
        .then(() => {
            return signIn({ username: body.email!, password: body.password! });
        });
}
