import { useMutation } from 'react-query';

import { createTeam } from '@features/team/create-team/api/createTeam';
import { CreateTeam } from '@features/team/create-team/model/CreateTeam';

import { estimateHttp } from '@shared/config/axios';
import { AxiosUseMutationOptions } from '@shared/types';

export function useCreateTeam(options?: AxiosUseMutationOptions<void, CreateTeam>) {
    return useMutation((data: CreateTeam) => createTeam(data), options);
}
