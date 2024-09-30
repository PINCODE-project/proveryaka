import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { removeTeamUser } from '../api/removeTeamUser';
import { RemoveUserFromTeamRequest } from '../model/RemoveUserFromTeamRequest';

export function useRemoveTeamUser(options?: AxiosUseMutationOptions<void, RemoveUserFromTeamRequest>) {
    return useMutation(
        (data: RemoveUserFromTeamRequest) => removeTeamUser(data),
        options,
    );
}
