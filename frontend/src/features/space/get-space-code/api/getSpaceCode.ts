import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSpaceCode(spaceId: string, isNeedGenerateNewCode: boolean): Promise<string> {
    return estimateHttp.get<{ inviteCode: string }>(`/space/${spaceId}/code`, { params: { isNeedGenerateNewCode } })
        .then(extractData)
        .then(data => data.inviteCode);
}
