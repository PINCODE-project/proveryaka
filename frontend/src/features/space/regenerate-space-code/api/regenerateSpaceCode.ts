import { estimateHttp } from '@shared/config/axios';

export function regenerateSpaceCode(spaceId: string): Promise<void> {
    return estimateHttp.get(`/space/${spaceId}/code`, { params: { isNeedGenerateNewCode: true } }).then();
}
