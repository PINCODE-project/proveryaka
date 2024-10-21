import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createIssueDraft } from '../api/createIssueDraft';
import { CreateIssueDraftRequest } from '../model/CreateIssueDraftRequest';

type Arguments = {
    spaceId: string;
    data: Omit<CreateIssueDraftRequest, 'spaceId'>;
};

export function useCreateIssueDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => createIssueDraft(args.data, args.spaceId), options);
}
