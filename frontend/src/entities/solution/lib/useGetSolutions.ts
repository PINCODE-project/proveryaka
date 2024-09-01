import { useQuery } from 'react-query';

import { getSolutions } from '@entities/solution/api/getSolutions';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetSolutions(spaceId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetSolutionForExpert[]>) {
    return useQuery(['expert-solutions/get', filters], () => getSolutions(spaceId, filters), options);
}
