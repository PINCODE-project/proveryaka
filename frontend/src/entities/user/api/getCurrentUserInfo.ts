import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { FullUserInfoResponse } from '../model/FullUserInfoResponse';

export function getCurrentUserInfo(): Promise<FullUserInfoResponse> {
    return estimateHttp.get<FullUserInfoResponse>('user/info')
        .then(extractData);
}
