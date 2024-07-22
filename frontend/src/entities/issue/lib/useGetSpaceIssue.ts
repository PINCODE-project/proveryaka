import { useQuery } from 'react-query';

import { GetIssueResponse } from '@entities/issue';
import { GetIssueFilters, getSpaceIssues } from '@entities/issue/api/getSpaceIssues';
import { getSpaceIssueQueryKey } from '@entities/issue/lib/getSpaceIssueQueryKey';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';

export function useGetSpaceIssue(spaceId: string, filters: GetIssueFilters, options?: AxiosUseQueryOptions<GetListResponse<GetIssueResponse>>) {
    return useQuery(getSpaceIssueQueryKey(spaceId), () => getSpaceIssues(filters, spaceId), options);
}
