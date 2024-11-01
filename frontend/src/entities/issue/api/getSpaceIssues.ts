import { GetIssueResponse } from '@entities/issue';
import { GetIssueFilters } from '@entities/issue/model/GetIssueFilters';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmptyList } from '@shared/lib';
import { GetListResponse } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

export function getSpaceIssues(
    spaceId: string,
    filters?: GetIssueFilters,
    sorting?: ListSorting,
): Promise<GetListResponse<GetIssueResponse>> {
    return estimateHttp.get<GetListResponse<GetIssueResponse>>('issue/all', {
        params: {
            ...filters,
            ...sorting,
            spaceId,
        },
    })
        .then(extractData)
        .then(replaceIfEmptyList<GetIssueResponse>([]));
}
