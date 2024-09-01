import { useQuery } from 'react-query';

import { GetIssueResponse } from '@entities/issue';
import { getSpaceIssues } from '@entities/issue/api/getSpaceIssues';
import { getSpaceIssueQueryKey } from '@entities/issue/lib/getSpaceIssueQueryKey';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

export function useGetSpaceIssue(spaceId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetIssueResponse>>) {
    return useQuery(getSpaceIssueQueryKey(spaceId, filters), () => getSpaceIssues(spaceId, filters), options);
}
