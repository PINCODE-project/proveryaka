import { useMutation } from 'react-query';

import { deleteMyDraft } from '@features/issue/create-issue/api/deleteMyDraft';

import { AxiosUseMutationOptions } from '@shared/types';

type Arguments = {
    spaceId: string;
};

export function useDeleteMyDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => deleteMyDraft(args.spaceId), options);
}
