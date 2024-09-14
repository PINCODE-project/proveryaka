import { refreshToken } from '@features/auth/refresh-token';

import { estimateHttp } from '@shared/config/axios';
import { TokenService } from '@shared/lib';

import { CreateSpaceRequest } from '../model/CreateSpaceRequest';

export function createSpace(data: CreateSpaceRequest): Promise<void> {
    return estimateHttp.post('admin/space/create', data)
        .then(refreshToken)
        .then(token => token && TokenService.setToken(token))
        .then();
};
