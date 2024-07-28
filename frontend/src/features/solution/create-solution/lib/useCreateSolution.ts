import { useMutation } from 'react-query';

import { createSolution } from '@features/solution/create-solution/api/createSolution';
import { CreateSolution } from '@features/solution/create-solution/model/CreateSolution';

import { AxiosUseMutationOptions } from '@shared/types';

type Arguments = {
    issueId: string;
    data: CreateSolution;
};

export function useCreateSolution(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation(
        (args: Arguments) => createSolution(args.issueId, args.data),
        options,
    );
};
