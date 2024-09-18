import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { exitUser } from '../api/exitUser';

export function useExitUser(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation(
        (spaceId: string) => exitUser(spaceId),
        options,
    );
}
