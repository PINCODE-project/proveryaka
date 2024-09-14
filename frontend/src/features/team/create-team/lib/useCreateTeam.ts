import { useMutation } from 'react-query';

import { TeamEditor } from '@entities/team';

import { AxiosUseMutationOptions } from '@shared/types';

import { createTeam } from '../api/createTeam';

export function useCreateTeam(options?: AxiosUseMutationOptions<void, TeamEditor>) {
    return useMutation((data: TeamEditor) => createTeam(data), options);
}
