import { estimateHttp } from '@shared/config/axios';

import { AddUserTeam } from '../model/AddUserTeam';

export function addUserTeam(data: AddUserTeam): Promise<void> {
    return estimateHttp.post('team/add-user', data).then();
}
