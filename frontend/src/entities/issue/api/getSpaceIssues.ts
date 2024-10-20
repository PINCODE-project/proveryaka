import { GetIssueResponse } from '@entities/issue';
import { GetIssueFilters } from '@entities/issue/model/GetIssueFilters';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmptyList } from '@shared/lib';
import { GetListResponse } from '@shared/types';

export function getSpaceIssues(spaceId: string, filters?: GetIssueFilters): Promise<GetListResponse<GetIssueResponse>> {
    return estimateHttp.get<GetListResponse<GetIssueResponse>>('issue/all', { params: { ...filters, spaceId } })
        .then(extractData)
        .then(replaceIfEmptyList<GetIssueResponse>([]));
}
