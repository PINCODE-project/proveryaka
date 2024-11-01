import { estimateHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function deleteMyDraft(spaceId: string): Promise<void> {
    return estimateHttp.delete(
        `issue-draft/my/${spaceId}`,
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
    ).then(extractData);
}
