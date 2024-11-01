import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetIssueFormList } from '../model/GetIssueFormList';

export function getIssueFormList(issueId: string): Promise<GetIssueFormList> {
    return estimateHttp.get<GetIssueFormList>(`issue-form/all/${issueId}`).then(extractData);
}
