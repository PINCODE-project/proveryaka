import { useMutation } from 'react-query';

import { Space } from '@entities/space';

import { AxiosUseMutationOptions } from '@shared/types';

import { editSpace } from '../api/editSpace';

export function useEditSpace(options?: AxiosUseMutationOptions<void, Space>) {
    return useMutation(editSpace, options);
}
