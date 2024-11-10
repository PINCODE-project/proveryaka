import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { deleteSolution } from '../api/deleteSolution';

export function useDeleteSolution(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation(
        (solutionId: string) => deleteSolution(solutionId),
        options,
    );
}
