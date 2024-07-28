import { CreateTeam } from '@features/team/create-team/model/CreateTeam';

import { estimateHttp } from '@shared/config/axios';

export function editTeam(data: Omit<CreateTeam, 'spaceId'>): Promise<void> {
    return estimateHttp.patch('team', data).then();
}
