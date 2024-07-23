import { refreshToken } from '@features/auth/refresh-token';

import { estimateHttp } from '@shared/config/axios';
import { TokenService } from '@shared/lib';

export function enterSpaceByCode(inviteCode: string): Promise<void> {
    return estimateHttp.post('space/add-user-by-code', { inviteCode })
        .then(refreshToken)
        .then(token => token && TokenService.setToken(token))
        .then();
}
