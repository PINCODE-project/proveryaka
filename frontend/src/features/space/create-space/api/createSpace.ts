import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';

export function createSpace(data: SpaceSettings): Promise<void> {
    return estimateHttp.post('organizer/space/create', data)
        .then();
};
