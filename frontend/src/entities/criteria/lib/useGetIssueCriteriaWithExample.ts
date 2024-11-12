import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

import { getIssueCriteriaWithExample } from '../api/getIssueCriteriaWithExample';
import { GetCriteriaWithExampleResponse } from '../model/GetCriteriaWithExampleResponse';

export function useGetIssueCriteriaWithExample(
    issueId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<GetListResponse<GetCriteriaWithExampleResponse>>,
) {
    return useQuery(
        ['issue-criteria-all-with-example/get', issueId, filters].filter(Boolean),
        () => getIssueCriteriaWithExample(issueId, filters),
        options,
    );
}
