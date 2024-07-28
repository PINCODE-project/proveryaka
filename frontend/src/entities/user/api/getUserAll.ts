import { FullUserInfoList } from '@entities/user/model/FullUserInfoList';

import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

export function getUserAll(): Promise<FullUserInfoList> {
    return estimateHttp.get<FullUserInfoList>('user/all')
        .then(extractData)
        .then(replaceIfEmpty<FullUserInfoList>({ userInfoList: [] }));
}
