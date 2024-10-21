import { estimateHttp } from '@shared/config/axios';

import { CreateIssueDraftRequest } from '../model/CreateIssueDraftRequest';

export function updateMyDraft(data: Omit<CreateIssueDraftRequest, 'spaceId'>, spaceId: string): Promise<void> {
    return estimateHttp.post(
        'issue-draft/update',
        { ...data, description: { value: data.description }, spaceId },
    ).then();
}
