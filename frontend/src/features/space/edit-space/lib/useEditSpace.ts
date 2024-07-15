import { useMutation } from 'react-query';

import { SpaceSettings } from '@entities/space';

import { AxiosUseMutationOptions } from '@shared/types';

import { editSpace } from '../api/editSpace';

export function useEditSpace(options?: AxiosUseMutationOptions<void, SpaceSettings>) {
    return useMutation(editSpace, options);
}
