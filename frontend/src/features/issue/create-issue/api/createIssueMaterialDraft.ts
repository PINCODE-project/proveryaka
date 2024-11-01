import { estimateHttp } from '@shared/config/axios';

import { CreateIssueMaterialDraftRequest } from '../model/CreateIssueMaterialDraftRequest';

export function createIssueMaterialDraft(spaceId: string, data: CreateIssueMaterialDraftRequest[]): Promise<void> {
    return estimateHttp.put('issue-draft/add-materials', { spaceId, materials: data }).then();
}
