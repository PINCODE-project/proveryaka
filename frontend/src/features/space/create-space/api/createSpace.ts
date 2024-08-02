import { refreshToken } from '@features/auth/refresh-token';

import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';
import { TokenService } from '@shared/lib';

export function createSpace(data: SpaceSettings): Promise<void> {
    return estimateHttp.post('admin/space/create', data)
        .then(refreshToken)
        .then(token => token && TokenService.setToken(token))
        .then();
};
