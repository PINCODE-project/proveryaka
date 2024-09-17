import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';

export function editSpace(data: SpaceSettings): Promise<void> {
    const body: SpaceSettings = {
        description: data.description,
        iconFileId: data.iconFileId,
        name: data.name,
    };

    return estimateHttp.put('admin/space/update', body).then();
};
