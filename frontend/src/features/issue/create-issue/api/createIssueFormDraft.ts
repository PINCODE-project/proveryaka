import { estimateHttp } from '@shared/config/axios';

import { CreateIssueFormRequest } from '../model/CreateIssueFormRequest';

export function createIssueFormDraft(spaceId: string, data: CreateIssueFormRequest[]): Promise<void> {
    return estimateHttp.put('issue-draft/add-forms', { spaceId, forms: data }).then();
}
