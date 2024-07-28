import { GetSpaceUserRole } from '@entities/space/model/GetSpaceUserRole';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

export function getSpaceRoles(spaceId: string): Promise<GetSpaceUserRole> {
    return estimateHttp.get<GetSpaceUserRole>(`space-user-role/${spaceId}`)
        .then(extractData)
        .then(replaceIfEmpty<GetSpaceUserRole>({ roleList: [] }));
}
