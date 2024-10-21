import { estimateHttp } from '@shared/config/axios';

export function saveMyDraft(spaceId: string): Promise<void> {
    return estimateHttp.post('issue-draft/save', { spaceId }).then();
}
