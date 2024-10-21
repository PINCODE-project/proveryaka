import { estimateHttp } from '@shared/config/axios';

import { CreateIssueDraftRequest } from '../model/CreateIssueDraftRequest';

export function createIssueDraft(data: Omit<CreateIssueDraftRequest, 'spaceId'>, spaceId: string): Promise<void> {
    return estimateHttp.post('issue-draft/create', { ...data, spaceId });
}
