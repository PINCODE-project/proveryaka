import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

import { getAllIssueSolutionsCount } from '../api/getAllIssueSolutionsCount';

export function useGetIssueSolutionsCount(
    spaceId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<number>,
) {
    return useQuery(['issue-solutions/count/get', filters], () => getAllIssueSolutionsCount(spaceId, filters), options);
}
