import { FullUserInfoResponse } from '@entities/user/model/FullUserInfoResponse';

import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getCurrentUserInfo(): Promise<FullUserInfoResponse> {
    return estimateHttp.get<FullUserInfoResponse>('user/info')
        .then(extractData);
}
