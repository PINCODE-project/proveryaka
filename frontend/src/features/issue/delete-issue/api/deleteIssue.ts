import { estimateHttp } from '@shared/config/axios';

export function deleteIssue(issueId: string): Promise<void> {
    return estimateHttp.delete(`/issue/${issueId}`);
}
