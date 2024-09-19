import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { getSpaceCode } from '../api/getSpaceCode';

export function useRegenerateSpaceCode(options?: AxiosUseMutationOptions<string, string>) {
    return useMutation((spaceId: string) => getSpaceCode(spaceId, true), options);
}
