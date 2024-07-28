import { GetTeamList } from '@entities/team/model/GetTeamList';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getSpaceUserTeams(spaceId: string, filters: ListFilters): Promise<GetTeamList> {
    return estimateHttp.get<GetTeamList>('team', { params: { spaceId, ...filters } })
        .then(extractData)
        .then(replaceIfEmpty<GetTeamList>({ teamList: [] }));
}
