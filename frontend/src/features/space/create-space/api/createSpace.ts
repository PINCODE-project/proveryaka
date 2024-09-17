import { refreshToken } from '@features/auth/refresh-token';

import { estimateHttp } from '@shared/config/axios';
import { TokenService } from '@shared/lib';

import { CreateSpaceRequest } from '../model/CreateSpaceRequest';

export function createSpace(data: CreateSpaceRequest): Promise<void> {
    const body: CreateSpaceRequest = {
        description: data.description,
        iconFileId: data.iconFileId,
        name: data.name,
        organizerId: data.organizerId,
        accessType: data.accessType,
        spaceSettings: {
            isUseTeam: data.spaceSettings.isUseTeam ?? false,
        },
    };

    return estimateHttp.post('admin/space/create', body)
        .then(refreshToken)
        .then(token => token && TokenService.setToken(token))
        .then();
};
