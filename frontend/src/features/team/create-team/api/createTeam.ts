import { CreateTeam } from '@features/team/create-team/model/CreateTeam';

import { estimateHttp } from '@shared/config/axios';

export function createTeam(data: CreateTeam): Promise<void> {
    return estimateHttp.post('team', data).then();
}
