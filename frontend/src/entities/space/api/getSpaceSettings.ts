import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { SpaceSettings } from '../model/SpaceSettings';

export function getSpaceSettings(spaceId: string): Promise<SpaceSettings> {
    return estimateHttp.get<SpaceSettings>(`space-settings/${spaceId}`)
        .then(extractData);
}
