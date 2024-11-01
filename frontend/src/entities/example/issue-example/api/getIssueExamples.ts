import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

import { GetIssueExample } from '../model/GetIssueExample';

export function getIssueExamples(issueId: string, filters?: ListFilters): Promise<GetListResponse<GetIssueExample>> {
    return estimateHttp.get<GetListResponse<GetIssueExample>>('issue-example/all', { params: { ...filters, issueId } })
        .then(extractData);
}
