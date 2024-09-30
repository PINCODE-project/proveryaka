import { estimateHttp } from '@shared/config/axios';

import { EditSpaceRequest } from '../model/EditSpaceRequest';

export function editSpace(data: EditSpaceRequest): Promise<void> {
    const body: EditSpaceRequest = {
        description: data.description,
        iconFileId: data.iconFileId,
        name: data.name,
        id: data.id,
        accessType: data.accessType,
    };

    return estimateHttp.put('admin/space/update', body).then();
};
