import { useQuery } from 'react-query';

import { getStudentSolutionReviews } from '@entities/solution/api/getStudentSolutionReviews';
import { GetSolutionReviews } from '@entities/solution/model/GetSolutionReviews';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetStudentSolutionReviews(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionReviews>) {
    return useQuery(['solution-reviews/get', solutionId], () => getStudentSolutionReviews(solutionId), options);
}
