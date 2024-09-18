import { refreshToken } from '@features/auth/refresh-token';

import { estimateHttp } from '@shared/config/axios';
import { TokenService } from '@shared/lib';

export function deleteSpace(spaceId: string): Promise<void> {
    return estimateHttp.delete(`/admin/space/${spaceId}`)
        .then(refreshToken)
        .then(token => token && TokenService.setToken(token))
        .then();
}
