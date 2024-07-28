import { useMutation } from 'react-query';

import { addUserTeam } from '@features/team/add-user-team/api/addUserTeam';
import { AddUserTeam } from '@features/team/add-user-team/model/AddUserTeam';
import { createTeam } from '@features/team/create-team/api/createTeam';
import { CreateTeam } from '@features/team/create-team/model/CreateTeam';

import { estimateHttp } from '@shared/config/axios';
import { AxiosUseMutationOptions } from '@shared/types';

export function useAddUserTeam(options?: AxiosUseMutationOptions<void, AddUserTeam>) {
    return useMutation((data: AddUserTeam) => addUserTeam(data), options);
}
