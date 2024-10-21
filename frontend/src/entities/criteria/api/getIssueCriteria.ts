import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

import { GetCriteriaResponse } from '../model/GetCriteriaResponse';

export function getIssueCriteria(
    issueId: string,
    filters?: ListFilters,
): Promise<GetListResponse<GetCriteriaResponse>> {
    return estimateHttp.get<GetListResponse<GetCriteriaResponse>>('criteria/all', { params: { ...filters, issueId } })
        .then(extractData);
}
