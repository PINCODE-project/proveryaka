import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';

export function editSpace(data: SpaceSettings): Promise<void> {
    return estimateHttp.put('admin/space/update', data).then();
};
