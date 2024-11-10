import { useMutation } from 'react-query';

import { GetTeam } from '@entities/team';

import { AxiosUseMutationOptions } from '@shared/types';

import { leaveTeam } from '../api/leaveTeam';

export function useLeaveTeam(options?: AxiosUseMutationOptions<void, GetTeam>) {
    return useMutation(
        (team: GetTeam) => leaveTeam(team.id),
        options,
    );
}
