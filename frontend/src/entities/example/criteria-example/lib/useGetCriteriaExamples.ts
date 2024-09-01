import { useQuery } from 'react-query';

import { GetCriteriaExample, getCriteriaExamples, getCriteriaExamplesQueryKey } from '@entities/example/criteria-example';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

export function useGetCriteriaExamples(criteriaId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetCriteriaExample>>) {
    return useQuery(getCriteriaExamplesQueryKey(criteriaId, filters), () => getCriteriaExamples(criteriaId, filters), options);
}
