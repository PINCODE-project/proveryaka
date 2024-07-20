import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetExpertsListResponse } from '../model/GetExpertResponse';

export function getSpaceExperts(spaceId: string): Promise<GetExpertsListResponse> {
    return estimateHttp.get<GetExpertsListResponse>(`/space/${spaceId}/experts`)
        .then(extractData)
        .then(replaceIfEmpty<GetExpertsListResponse>({ expertInfoList: [] }));
};
