import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSpace(spaceId: string): Promise<SpaceSettings> {
    return estimateHttp.get<SpaceSettings>(`admin/space/${spaceId}`)
        .then(extractData);
}
