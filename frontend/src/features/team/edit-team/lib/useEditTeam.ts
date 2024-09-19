import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { editTeam } from '../api/editTeam';
import { EditTeam } from '../model/EditTeam';

export function useEditTeam(options?: AxiosUseMutationOptions<void, EditTeam>) {
    return useMutation((data: EditTeam) => editTeam(data), options);
}
