import { useQuery } from 'react-query';

import { getStudentIssueSolution } from '@entities/solution/api/getStudentIssueSolution';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { GetSolution } from '@entities/solution/model/GetSolution';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetStudentIssueSolution(issueId: string, options?: AxiosUseQueryOptions<GetSolution>) {
    return useQuery(getStudentIssueSolutionQueryKey(issueId), () => getStudentIssueSolution(issueId), options);
}
