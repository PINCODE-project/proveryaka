import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

import { getIssueCriteriaQueryKey } from './getIssueCriteriaQueryKey';
import { getIssueCriteria } from '../api/getIssueCriteria';
import { GetCriteriaResponse } from '../model/GetCriteriaResponse';

export function useGetIssueCriteria(
    issueId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<GetListResponse<GetCriteriaResponse>>,
) {
    return useQuery(getIssueCriteriaQueryKey(issueId, filters), () => getIssueCriteria(issueId, filters), options);
}
