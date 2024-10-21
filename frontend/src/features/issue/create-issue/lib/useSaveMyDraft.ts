import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { saveMyDraft } from '../api/saveMyDraft';

type Arguments = {
    spaceId: string;
};

export function useSaveMyDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => saveMyDraft(args.spaceId), options);
}
