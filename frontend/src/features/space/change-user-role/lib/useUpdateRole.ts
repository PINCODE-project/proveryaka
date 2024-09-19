import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { updateRole } from '../api/updateRole';
import { UpdateRoleToUserInSpace } from '../model/UpdateRoleToUserInSpace';

export function useUpdateRole(options?: AxiosUseMutationOptions<void, UpdateRoleToUserInSpace>) {
    return useMutation(
        (data: UpdateRoleToUserInSpace) => updateRole(data),
        options,
    );
}
