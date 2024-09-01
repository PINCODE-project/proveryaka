import { GetIssueResponse } from '@entities/issue';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmptyList } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

export function getSpaceIssues(spaceId: string, filters?: ListFilters): Promise<GetListResponse<GetIssueResponse>> {
    return estimateHttp.get<GetListResponse<GetIssueResponse>>('issue/all', { params: { ...filters, spaceId } })
        .then(extractData)
        .then(replaceIfEmptyList<GetIssueResponse>([]));
};
