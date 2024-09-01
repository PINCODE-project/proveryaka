import { useQuery } from 'react-query';

import { getAllIssueSolution } from '@entities/solution/api/getAllIssueSolution';
import { getExpertSolutions } from '@entities/solution/api/getExpertSolutions';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseMutationOptions, AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetIssueSolutions(issueId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetSolutionForExpert[]>) {
    return useQuery(['issue-solutions/get', filters], () => getAllIssueSolution(issueId, filters), options);
}
