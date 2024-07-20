import { estimateHttp } from '@shared/config/axios';

export function deleteSpace(spaceId: string): Promise<void> {
    return estimateHttp.delete(`/admin/space/${spaceId}`).then();
}
