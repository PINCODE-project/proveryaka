import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { deleteSpace } from '../api/deleteSpace';

export function useDeleteSpace(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation((spaceId: string) => deleteSpace(spaceId), options);
}
