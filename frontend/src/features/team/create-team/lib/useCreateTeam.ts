import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createTeam } from '../api/createTeam';
import { CreateTeam } from '../model/CreateTeam';

export function useCreateTeam(options?: AxiosUseMutationOptions<void, CreateTeam>) {
    return useMutation((data: CreateTeam) => createTeam(data), options);
}
