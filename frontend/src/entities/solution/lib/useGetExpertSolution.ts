import { useQuery } from 'react-query';

import { getExpertSolution } from '@entities/solution/api/getExpertSolution';
import { getSolution } from '@entities/solution/api/getSolution';
import { getStudentIssueSolution } from '@entities/solution/api/getStudentIssueSolution';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetExpertSolution(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionForExpert>) {
    return useQuery(['solution-expert/get', solutionId], () => getExpertSolution(solutionId), options);
}
