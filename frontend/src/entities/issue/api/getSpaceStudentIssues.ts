import { GetIssueFilters } from '@entities/issue/model/GetIssueFilters';
import { GetStudentIssueResponse } from '@entities/issue/model/GetStudentIssueResponse';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmptyList } from '@shared/lib';
import { GetListResponse } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

export function getSpaceStudentIssues(
    spaceId: string,
    filters?: GetIssueFilters,
    sorting?: ListSorting,
): Promise<GetListResponse<GetStudentIssueResponse>> {
    return estimateHttp.get<GetListResponse<GetStudentIssueResponse>>('issue/student/all', {
        params: {
            ...filters,
            ...sorting,
            spaceId,
        },
    })
        .then(extractData)
        .then(replaceIfEmptyList<GetStudentIssueResponse>([]));
}
