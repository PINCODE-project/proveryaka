import { GetCriteriaExample } from '@entities/example/criteria-example';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

export function getCriteriaExamples(criteriaId: string, filters?: ListFilters): Promise<GetListResponse<GetCriteriaExample>> {
    return estimateHttp.get<GetListResponse<GetCriteriaExample>>('criteria-example/all', { params: { ...filters, criteriaId } })
        .then(extractData);
}
