import { useQuery } from 'react-query';

import { getSolution } from '@entities/solution/api/getSolution';
import { getSolutionReviews } from '@entities/solution/api/getSolutionReviews';
import { getStudentIssueSolution } from '@entities/solution/api/getStudentIssueSolution';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionReviews } from '@entities/solution/model/GetSolutionReviews';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSolutionReviews(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionReviews>) {
    return useQuery(['solution-reviews/get', solutionId], () => getSolutionReviews(solutionId), options);
}
