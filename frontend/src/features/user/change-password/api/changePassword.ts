import { ssoHttp } from '@shared/config/axios';

import { ChangePassword } from '../model/ChangePassword';

export function changePassword(data: ChangePassword): Promise<void> {
    return ssoHttp.patch('api/v1/public/password/change', data).then();
};
