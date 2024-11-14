import { GetIssueResponse } from '@entities/issue';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getIssueWithFullInfo(issueId: string): Promise<GetIssueResponse> {
    return estimateHttp.get<GetIssueResponse>(`issue/${issueId}/with-full-info`).then(extractData);
}
