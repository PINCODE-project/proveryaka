import { useQuery } from 'react-query';

import { getSpaceIssues } from '@entities/issue/api/getSpaceIssues';
import { getSpaceIssueQueryKey } from '@entities/issue/lib/getSpaceIssueQueryKey';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

import { GetIssueFilters } from '../model/GetIssueFilters';
import { GetIssueResponse } from '../model/GetIssueResponse';

export function useGetSpaceIssue(
    spaceId: string,
    filters?: GetIssueFilters,
    sorting?: ListSorting,
    options?: AxiosUseQueryOptions<GetListResponse<GetIssueResponse>>,
) {
    return useQuery(
        getSpaceIssueQueryKey(spaceId, filters, sorting),
        () => getSpaceIssues(spaceId, filters, sorting),
        options,
    );
}
