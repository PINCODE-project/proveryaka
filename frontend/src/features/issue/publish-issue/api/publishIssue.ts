import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function publishIssue(issueId: string): Promise<boolean> {
    return estimateHttp.get<{isSuccess: boolean}>(`/issue/${issueId}/publish`)
        .then(extractData)
        .then(data => data.isSuccess);
}
