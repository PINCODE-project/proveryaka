import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

import { GetCriteriaWithExampleResponse } from '../model/GetCriteriaWithExampleResponse';

export function getIssueCriteriaWithExample(
    issueId: string,
    filters?: ListFilters,
): Promise<GetListResponse<GetCriteriaWithExampleResponse>> {
    return estimateHttp.get<GetListResponse<GetCriteriaWithExampleResponse>>('criteria/all/with-example', { params: { ...filters, issueId } })
        .then(extractData);
}
