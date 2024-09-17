import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetTeamFilters } from '../model/GetTeamFilters';
import { GetTeamList } from '../model/GetTeamList';

export function getSpaceUserTeams(spaceId: string, filters?: GetTeamFilters): Promise<GetTeamList> {
    return estimateHttp.get<GetTeamList>('team/user/list', { params: { entityId: spaceId, ...filters } })
        .then(extractData)
        .then(replaceIfEmpty<GetTeamList>({ teamList: [] }));
}
