import { GetIssueCountResponse } from '@entities/issue/model/GetIssueCountResponse';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetIssueFilters } from '../model/GetIssueFilters';

export function getSpaceIssueCount(spaceId: string, filters?: GetIssueFilters): Promise<GetIssueCountResponse> {
    return estimateHttp.get<GetIssueCountResponse>('issue/count', { params: { spaceId }, ...filters })
        .then(extractData);
}
