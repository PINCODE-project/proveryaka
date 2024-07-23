import { GetIssueResponse } from '@entities/issue';

import { estimateHttp } from '@shared/config/axios';

export function editIssue(data: GetIssueResponse): Promise<void> {
    return estimateHttp.put('issue/update', data)
        .then();
}
