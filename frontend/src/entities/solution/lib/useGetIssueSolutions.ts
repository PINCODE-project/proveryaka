import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

import { getAllIssueSolutions } from '../api/getAllIssueSolutions';
import { GetSolutionForExpert } from '../model/GetSolutionForExpert';

export function useGetIssueSolutions(
    spaceId: string,
    filters?: ListFilters,
    options?: AxiosUseQueryOptions<GetSolutionForExpert[]>,
) {
    return useQuery(['issue-solutions/get', filters], () => getAllIssueSolutions(spaceId, filters), options);
}
