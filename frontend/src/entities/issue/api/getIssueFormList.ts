import { GetIssueFormList } from '@entities/issue/model/GetIssueFormList';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getIssueFormList(issueId: string): Promise<GetIssueFormList> {
    return estimateHttp.get<GetIssueFormList>(`issue-form/all/${issueId}`).then(extractData);
};
