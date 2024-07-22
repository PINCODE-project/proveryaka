import { estimateHttp } from '@shared/config/axios';

import { CreateInfoWithFullInfo } from '../model/CreateInfoWithFullInfo';

export function createIssueFull(data: Omit<CreateInfoWithFullInfo, 'spaceId'>, spaceId: string): Promise<void> {
    return estimateHttp.post('issue/create/with-full-info', { ...data, spaceId }).then();
};
