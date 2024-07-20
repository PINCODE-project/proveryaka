import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetOrganizerListResponse } from '../model/GetOrganizerResponse';

export function getSpaceOrganizers(spaceId: string): Promise<GetOrganizerListResponse> {
    return estimateHttp.get<GetOrganizerListResponse>(`/space/${spaceId}/organizer`)
        .then(extractData)
        .then(replaceIfEmpty<GetOrganizerListResponse>({ organizerInfoList: [] }));
};
