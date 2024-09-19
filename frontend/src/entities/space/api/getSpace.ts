import { Space } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSpace(spaceId: string|number): Promise<Space> {
    return estimateHttp.get<Space>(`space/${spaceId}`)
        .then(extractData);
}
