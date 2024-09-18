import { estimateHttp } from '@shared/config/axios';

import { EditTeam } from '../model/EditTeam';

export function editTeam(data: EditTeam): Promise<void> {
    return estimateHttp.patch('team', data).then();
}
