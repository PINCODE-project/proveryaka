import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { addUserInSpace } from '../api/addUserInSpace';
import { AddUserToSpaceRequest } from '../model/AddUserToSpaceRequest';

export function useAddUserInSpace(options?: AxiosUseMutationOptions<void, AddUserToSpaceRequest>) {
    return useMutation((data: AddUserToSpaceRequest) => addUserInSpace(data), options);
}
