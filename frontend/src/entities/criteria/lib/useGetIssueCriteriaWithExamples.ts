import { useQuery } from 'react-query';

import { getIssueCriteriaWithExamples } from '@entities/criteria/api/getIssueCriteriaWithExamples';
import { getIssueCriteriaWithExamplesQueryKey } from '@entities/criteria/lib/getIssueCriteriaWithExamplesQueryKey';
import { GetCriteriaWithExamplesResponse } from '@entities/criteria/model/GetCriteriaWithExamplesResponse';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

export function useGetIssueCriteriaWithExamples(
    issueId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<GetListResponse<GetCriteriaWithExamplesResponse>>,
) {
    return useQuery(
        getIssueCriteriaWithExamplesQueryKey(issueId, filters),
        () => getIssueCriteriaWithExamples(issueId, filters),
        options,
    );
}
