import { estimateHttp } from '@shared/config/axios';

import { RemoveUserFromTeamRequest } from '../model/RemoveUserFromTeamRequest';

export function removeTeamUser(data: RemoveUserFromTeamRequest): Promise<void> {
    return estimateHttp.put('team/remove-user', data).then();
}
