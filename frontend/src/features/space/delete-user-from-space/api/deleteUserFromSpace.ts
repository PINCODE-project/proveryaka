import { estimateHttp } from '@shared/config/axios';

export function deleteUserFromSpace(spaceId: string, userId: string): Promise<void> {
    return estimateHttp.put(`space/${spaceId}/delete/${userId}`).then();
}
