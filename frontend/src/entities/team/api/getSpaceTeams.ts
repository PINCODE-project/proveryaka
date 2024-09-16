import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';
import { ListFilters } from '@shared/types';

import { GetTeamList } from '../model/GetTeamList';

export function getSpaceTeams(spaceId: string, filters?: ListFilters): Promise<GetTeamList> {
    return estimateHttp.get<GetTeamList>('team/list', { params: { spaceId, ...filters } })
        .then(extractData)
        .then(replaceIfEmpty<GetTeamList>({ teamList: [] }));
}
