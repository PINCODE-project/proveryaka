import { useQuery } from 'react-query';

import { getExpertSolutions } from '@entities/solution/api/getExpertSolutions';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseMutationOptions, AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetExpertSolutions(spaceId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetSolutionForExpert[]>) {
    return useQuery(['expert-solutions/get', filters], () => getExpertSolutions(spaceId, filters), options);
}
