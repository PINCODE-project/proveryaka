import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

import { getSolutions } from '../api/getSolutions';
import { GetSolutionForExpert } from '../model/GetSolutionForExpert';

export function useGetSolutions(
    spaceId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<GetSolutionForExpert[]>,
) {
    return useQuery(['expert-solutions/get', filters], () => getSolutions(spaceId, filters), options);
}
