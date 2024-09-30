import { estimateHttp } from '@shared/config/axios';

import { UpdateRoleToUserInSpace } from '../model/UpdateRoleToUserInSpace';

export function updateRole(body: UpdateRoleToUserInSpace): Promise<void> {
    return estimateHttp.put('space-user-role/update-role-to-user', body).then();
}
