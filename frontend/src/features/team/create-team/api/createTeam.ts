import { estimateHttp } from '@shared/config/axios';

import { CreateTeam } from '../model/CreateTeam';

export function createTeam(data: CreateTeam): Promise<void> {
    return estimateHttp.post('team', data).then();
}
