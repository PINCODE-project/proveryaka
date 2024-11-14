import { GetSpaceCountResponse } from '@entities/space/model/GetSpaceCountResponse';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getSpacesCount(filters?: ListFilters): Promise<GetSpaceCountResponse> {
    return estimateHttp.get<GetSpaceCountResponse>('space/count', { params: filters })
        .then(extractData);
}
