import { Space } from '@entities/space';

import { estimateHttp } from '@shared/config/axios';

export function editSpace(data: Space): Promise<void> {
    return estimateHttp.put('admin/space/update', data).then();
}
