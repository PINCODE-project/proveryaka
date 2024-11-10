import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetOrganizerListResponse } from '../model/GetOrganizerResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function getSpaceOrganizers(spaceId: string, filters?: SpaceUsersParams): Promise<GetOrganizerListResponse> {
    return estimateHttp.get<GetOrganizerListResponse>(`/space/${spaceId}/organizer`, { params: filters })
        .then(extractData)
        .then(replaceIfEmpty<GetOrganizerListResponse>({ organizerInfoList: [] }));
};
