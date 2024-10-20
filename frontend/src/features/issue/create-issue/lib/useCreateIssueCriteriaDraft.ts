import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createIssueCriteriaDraft } from '../api/createIssueCriteriaDraft';
import { CreateIssueCriteriaDraftRequest } from '../model/CreateIssueCriteriaDraftRequest';

type Arguments = {
    spaceId: string;
    data: CreateIssueCriteriaDraftRequest[];
};

export function useCreateIssueCriteriaDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => createIssueCriteriaDraft(args.spaceId, args.data), options);
}
