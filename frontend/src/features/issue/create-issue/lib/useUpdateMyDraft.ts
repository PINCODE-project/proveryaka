import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { updateMyDraft } from '../api/updateMyDraft';
import { CreateIssueDraftRequest } from '../model/CreateIssueDraftRequest';

type Arguments = {
    spaceId: string;
    data: Omit<CreateIssueDraftRequest, 'spaceId'>;
};

export function useUpdateMyDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => updateMyDraft(args.data, args.spaceId), options);
}
