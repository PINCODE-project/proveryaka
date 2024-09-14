import { TeamEditor } from '@entities/team/model/TeamEditor';

import { estimateHttp } from '@shared/config/axios';

export function createTeam(data: TeamEditor): Promise<void> {
    return estimateHttp.post('team', data).then();
}
