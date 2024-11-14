import { useQuery } from 'react-query';

import { getSolution } from '@entities/solution/api/getSolution';
import { getSolutionQueryKey } from '@entities/solution/lib/getSolutionQueryKey';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSolution(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionForExpert>) {
    return useQuery(getSolutionQueryKey(solutionId), () => getSolution(solutionId), options);
}
