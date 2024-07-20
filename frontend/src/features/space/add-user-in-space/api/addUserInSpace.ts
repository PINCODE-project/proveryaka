import { estimateHttp } from '@shared/config/axios';

import { AddUserToSpaceRequest } from '../model/AddUserToSpaceRequest';

export function addUserInSpace(data: AddUserToSpaceRequest): Promise<void> {
    return estimateHttp.post('space/user/add', data).then();
}
