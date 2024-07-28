import { SpaceSettings } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSpace(spaceId: string|number): Promise<SpaceSettings> {
    return estimateHttp.get<SpaceSettings>(`space/${spaceId}`)
        .then(extractData);
}
