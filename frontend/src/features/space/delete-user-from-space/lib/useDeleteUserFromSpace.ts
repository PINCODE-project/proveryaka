import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { deleteUserFromSpace } from '../api/deleteUserFromSpace';

type Arguments = {
    spaceId: string;
    userId: string;
};

export function useDeleteUserFromSpace(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation(
        (args: Arguments) => deleteUserFromSpace(args.spaceId, args.userId),
        options,
    );
}
