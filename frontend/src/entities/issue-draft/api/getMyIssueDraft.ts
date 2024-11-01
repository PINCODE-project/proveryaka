import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetIssueDraftResponse } from '../model/GetIssueDraftResponse';

export function getMyIssueDraft(spaceId: string): Promise<GetIssueDraftResponse> {
    return estimateHttp.get<GetIssueDraftResponse>(`issue-draft/my/${spaceId}`, {
        headers: {
            NotNotify: true,
        },
    }).then(extractData);
}
