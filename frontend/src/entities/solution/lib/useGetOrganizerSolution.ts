import { useQuery } from 'react-query';

import { getOrganizerSolution } from '@entities/solution/api/getOrganizerSolution';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetOrganizerSolution(solutionId: string, options?: AxiosUseQueryOptions<GetSolutionForExpert>) {
    return useQuery(['solution-organizer/get', solutionId], () => getOrganizerSolution(solutionId), options);
}
