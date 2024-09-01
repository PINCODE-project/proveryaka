import { useQuery } from 'react-query';

import { getStudentSolution } from '@entities/solution/api/getStudentSolution';
import { GetSolution } from '@entities/solution/model/GetSolution';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetStudentSolution(solutionId: string, options?: AxiosUseQueryOptions<GetSolution>) {
    return useQuery(['solution/get', solutionId], () => getStudentSolution(solutionId), options);
}
