import { useMutation } from 'react-query';

import { createTeam } from '@features/team/create-team/api/createTeam';
import { CreateTeam } from '@features/team/create-team/model/CreateTeam';
import { editTeam } from '@features/team/edit-team/api/editTeam';

import { estimateHttp } from '@shared/config/axios';
import { AxiosUseMutationOptions } from '@shared/types';

export function useEditTeam(options?: AxiosUseMutationOptions<void, Omit<CreateTeam, 'spaceId'>>) {
    return useMutation((data: Omit<CreateTeam, 'spaceId'>) => editTeam(data), options);
}
