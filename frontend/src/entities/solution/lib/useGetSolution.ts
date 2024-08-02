import { useQuery } from 'react-query';

import { getSolution } from '@entities/solution/api/getSolution';
import { getStudentIssueSolution } from '@entities/solution/api/getStudentIssueSolution';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { GetSolution } from '@entities/solution/model/GetSolution';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSolution(solutionId: string, options?: AxiosUseQueryOptions<GetSolution>) {
    return useQuery(['solution/get', solutionId], () => getSolution(solutionId), options);
}
