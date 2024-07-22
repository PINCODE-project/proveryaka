import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

import { GetSpaceResponse } from '../model/GetSpaceResponse';

export type GetSpaceFilters = ListFilters;

export function getSpaces(filters: GetSpaceFilters): Promise<GetListResponse<GetSpaceResponse>> {
    return estimateHttp.get<GetListResponse<GetSpaceResponse>>('space/all', { params: filters })
        .then(extractData)
        .then(replaceIfEmpty({ entityList: [] } as GetListResponse<GetSpaceResponse>));
}
