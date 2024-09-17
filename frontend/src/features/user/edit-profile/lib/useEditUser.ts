import { useMutation } from 'react-query';

import { FullUserInfoResponse } from '@entities/user';

import { AxiosUseMutationOptions } from '@shared/types';

import { editUser } from '../api/editUser';

export function useEditUser(options?: AxiosUseMutationOptions<void, Partial<FullUserInfoResponse>>) {
    return useMutation(
        (data: Partial<FullUserInfoResponse>) => editUser(data),
        options,
    );
}
