import { estimateHttp } from '@shared/config/axios';

export function enterSpaceByCode(inviteCode: string): Promise<void> {
    return estimateHttp.post('space/add-user-by-code', { inviteCode }).then();
}
