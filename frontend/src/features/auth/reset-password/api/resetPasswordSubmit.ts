import { ssoHttp } from '@shared/config/axios';

import { ResetPasswordSubmit } from '../model/ResetPasswordSubmit';

export function resetPasswordSubmit(token: string, body: ResetPasswordSubmit): Promise<void> {
    return ssoHttp.post(`api/v1/public/password/reset/${token}`, body).then();
}
