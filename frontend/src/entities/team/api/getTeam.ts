import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetTeam } from '../model/GetTeam';

export function getTeam(id: string): Promise<GetTeam> {
    return estimateHttp.get<GetTeam>(`/team/${id}`).then(extractData);
};
