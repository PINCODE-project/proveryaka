import { GetIssueResponse } from '@entities/issue';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getIssue(issueId: string): Promise<GetIssueResponse> {
    return estimateHttp.get<GetIssueResponse>(`issue/${issueId}`).then(extractData);
}
