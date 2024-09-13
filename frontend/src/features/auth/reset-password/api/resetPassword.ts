import { ssoHttp } from '@shared/config/axios';

import { ResetPassword } from '../model/ResetPassword';

export function resetPassword(body: ResetPassword): Promise<void> {
    return ssoHttp.post('api/v1/public/password/reset', body).then();
}
