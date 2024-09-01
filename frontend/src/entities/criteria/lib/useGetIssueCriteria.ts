import { useQuery } from 'react-query';

import { GetCriteriaResponse } from '@entities/criteria';
import { getIssueCriteria } from '@entities/criteria/api/getIssueCriteria';
import { getIssueCriteriaQueryKey } from '@entities/criteria/lib/getIssueCriteriaQueryKey';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

export function useGetIssueCriteria(issueId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetCriteriaResponse>>) {
    return useQuery(getIssueCriteriaQueryKey(issueId, filters), () => getIssueCriteria(issueId, filters), options);
}
