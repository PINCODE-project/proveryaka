import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createIssueMaterialDraft } from '../api/createIssueMaterialDraft';
import { CreateIssueMaterialDraftRequest } from '../model/CreateIssueMaterialDraftRequest';

type Arguments = {
    spaceId: string;
    data: CreateIssueMaterialDraftRequest[];
};

export function useCreateIssueMaterialDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => createIssueMaterialDraft(args.spaceId, args.data), options);
}
