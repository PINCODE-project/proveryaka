import { useMutation } from 'react-query';

import { regenerateSpaceCode } from '@features/space/regenerate-space-code/api/regenerateSpaceCode';

import { AxiosUseMutationOptions } from '@shared/types';

export function useRegenerateSpaceCode(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation((spaceId: string) => regenerateSpaceCode(spaceId), options);
}
