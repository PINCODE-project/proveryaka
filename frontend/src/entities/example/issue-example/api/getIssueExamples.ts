import { GetIssueExample } from '@entities/example/issue-example/model/GetIssueExample';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

export function getIssueExamples(issueId: string, filters: ListFilters): Promise<GetListResponse<GetIssueExample>> {
    return estimateHttp.get<GetListResponse<GetIssueExample>>('issue-example/all', { params: { ...filters, issueId } })
        .then(extractData);
}
