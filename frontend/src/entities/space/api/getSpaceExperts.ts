import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetExpertsListResponse } from '../model/GetExpertResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function getSpaceExperts(spaceId: string, filters?: SpaceUsersParams): Promise<GetExpertsListResponse> {
    return estimateHttp.get<GetExpertsListResponse>(`/space/${spaceId}/experts`, { params: filters })
        .then(extractData)
        .then(replaceIfEmpty<GetExpertsListResponse>({ expertsInfoList: [] }));
};
