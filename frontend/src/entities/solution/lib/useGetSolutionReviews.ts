import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSolutionReviews } from '../api/getSolutionReviews';
import { GetSolutionReviews } from '../model/GetSolutionReviews';

export function useGetSolutionReviews(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionReviews>) {
    return useQuery(['organizer/solution-reviews/get', solutionId], () => getSolutionReviews(solutionId), options);
}
