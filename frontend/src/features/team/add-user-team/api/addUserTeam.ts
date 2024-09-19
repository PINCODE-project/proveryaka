import { AddUserTeam } from '@features/team/add-user-team/model/AddUserTeam';

import { TeamEditor } from '@entities/team/model/TeamEditor';

import { estimateHttp } from '@shared/config/axios';

export function addUserTeam(data: AddUserTeam): Promise<void> {
    return estimateHttp.post('team/add-user', data).then();
}
