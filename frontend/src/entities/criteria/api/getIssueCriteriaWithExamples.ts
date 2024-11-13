import { GetCriteriaWithExamplesResponse } from '@entities/criteria/model/GetCriteriaWithExamplesResponse';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

export function getIssueCriteriaWithExamples(
    issueId: string,
    filters?: ListFilters,
): Promise<GetListResponse<GetCriteriaWithExamplesResponse>> {
    return estimateHttp.get<GetListResponse<GetCriteriaWithExamplesResponse>>(
        'criteria/all/with-example',
        { params: { ...filters, issueId } },
    ).then(extractData);
}
