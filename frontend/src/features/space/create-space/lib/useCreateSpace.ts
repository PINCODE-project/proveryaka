import { useMutation } from 'react-query';

import { SpaceSettings } from '@entities/space';

import { AxiosUseMutationOptions } from '@shared/types';

import { createSpace } from '../api/createSpace';

export function useCreateSpace(options?: AxiosUseMutationOptions<void, SpaceSettings>) {
    return useMutation(createSpace, options);
}
