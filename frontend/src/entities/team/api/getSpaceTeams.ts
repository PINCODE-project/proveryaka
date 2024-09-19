import { GetTeamFilters } from '@entities/team/model/GetTeamFilters';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetTeamList } from '../model/GetTeamList';

export function getSpaceTeams(spaceId: string, filters?: GetTeamFilters): Promise<GetTeamList> {
    return estimateHttp.get<GetTeamList>('team/list', { params: { entityId: spaceId, ...filters } })
        .then(extractData)
        .then(replaceIfEmpty<GetTeamList>({ teamList: [] }));
}
