import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

import { getSolutionsCount } from '../api/getSolutionsCount';

export function useGetSolutionsCount(
    spaceId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<number>,
) {
    return useQuery(['expert-solutions/count/get', filters], () => getSolutionsCount(spaceId, filters), options);
}
