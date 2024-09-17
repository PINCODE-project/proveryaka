import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createSpace } from '../api/createSpace';
import { CreateSpaceRequest } from '../model/CreateSpaceRequest';

export function useCreateSpace(options?: AxiosUseMutationOptions<void, CreateSpaceRequest>) {
    return useMutation(createSpace, options);
}
