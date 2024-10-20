import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';
import { GetListResponse } from '@shared/types';

import { GetIssueMaterial } from '../model/GetIssueMaterial';

export function getIssueMaterials(issueId: string): Promise<GetListResponse<GetIssueMaterial>> {
    return estimateHttp.get('/issue-material/all', { params: { issueId } })
        .then(extractData)
        .then(replaceIfEmpty({ entityList: [] }));
}
