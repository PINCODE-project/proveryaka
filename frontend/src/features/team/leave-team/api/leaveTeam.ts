import { estimateHttp } from '@shared/config/axios';

export function leaveTeam(teamId: string): Promise<void> {
    return estimateHttp.delete(`team/${teamId}`).then();
}
