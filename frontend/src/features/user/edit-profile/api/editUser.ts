import { FullUserInfoResponse } from '@entities/user';

import { estimateHttp } from '@shared/config/axios';

export function editUser(data: Partial<FullUserInfoResponse>): Promise<void> {
    return estimateHttp.patch('user', data).then();
};
