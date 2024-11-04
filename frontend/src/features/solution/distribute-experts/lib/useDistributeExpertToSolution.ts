import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { distributeExpertToSolution } from '../api/distributeExpertToSolution';
import { SetExpertToSolutionRequest } from '../model/SetExpertToSolutionRequest';

export function useDistributeExpertToSolution(options?: AxiosUseMutationOptions<void, SetExpertToSolutionRequest>) {
    return useMutation((data: SetExpertToSolutionRequest) => distributeExpertToSolution(data), options);
}
