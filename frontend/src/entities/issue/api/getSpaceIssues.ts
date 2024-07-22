import { GetIssueResponse } from '@entities/issue';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmptyList } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

export type GetIssueFilters = ListFilters;

export function getSpaceIssues(filters: GetIssueFilters, spaceId: string): Promise<GetListResponse<GetIssueResponse>> {
    return estimateHttp.get<GetListResponse<GetIssueResponse>>('issue/all', { params: { ...filters, spaceId } })
        .then(extractData)
        .then(replaceIfEmptyList<GetIssueResponse>([]));
};
