import { useQuery } from 'react-query';

import { getSpaceIssues } from '@entities/issue/api/getSpaceIssues';
import { getSpaceIssueQueryKey } from '@entities/issue/lib/getSpaceIssueQueryKey';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';

import { GetIssueFilters } from '../model/GetIssueFilters';
import { GetIssueResponse } from '../model/GetIssueResponse';

export function useGetSpaceIssue(
    spaceId: string,
    filters?: GetIssueFilters,
    orderBy?: number,
    isDesc?: boolean,
    options?: AxiosUseQueryOptions<GetListResponse<GetIssueResponse>>,
) {
    return useQuery(
        getSpaceIssueQueryKey(spaceId, filters, orderBy, isDesc),
        () => getSpaceIssues(spaceId, filters, orderBy, isDesc),
        options,
    );
}
