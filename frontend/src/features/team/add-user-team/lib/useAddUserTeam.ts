import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { addUserTeam } from '../api/addUserTeam';
import { AddUserTeam } from '../model/AddUserTeam';

export function useAddUserTeam(options?: AxiosUseMutationOptions<void, AddUserTeam>) {
    return useMutation((data: AddUserTeam) => addUserTeam(data), options);
}
