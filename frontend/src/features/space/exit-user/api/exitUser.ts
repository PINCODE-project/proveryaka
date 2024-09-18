import { estimateHttp } from '@shared/config/axios';

export function exitUser(spaceId: string): Promise<void> {
    return estimateHttp.put(`space/${spaceId}/exit-user`).then();
}
