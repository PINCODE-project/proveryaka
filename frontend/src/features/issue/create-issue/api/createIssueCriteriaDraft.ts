import { estimateHttp } from '@shared/config/axios';

import { CreateIssueCriteriaDraftRequest } from '../model/CreateIssueCriteriaDraftRequest';

export function createIssueCriteriaDraft(spaceId: string, data: CreateIssueCriteriaDraftRequest[]): Promise<void> {
    return estimateHttp.put('issue-draft/add-criteria', { spaceId, criteria: data });
}
