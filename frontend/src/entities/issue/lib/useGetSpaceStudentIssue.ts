import { useQuery } from 'react-query';

import { getSpaceStudentIssues } from '@entities/issue/api/getSpaceStudentIssues';
import { getSpaceStudentIssueQueryKey } from '@entities/issue/lib/getSpaceStudentIssueQueryKey';
import { GetStudentIssueResponse } from '@entities/issue/model/GetStudentIssueResponse';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

import { GetIssueFilters } from '../model/GetIssueFilters';

export function useGetSpaceStudentIssue(
    spaceId: string,
    filters?: GetIssueFilters,
    sorting?: ListSorting,
    options?: AxiosUseQueryOptions<GetListResponse<GetStudentIssueResponse>>,
) {
    return useQuery(
        getSpaceStudentIssueQueryKey(spaceId, filters, sorting),
        () => getSpaceStudentIssues(spaceId, filters, sorting),
        options,
    );
}
