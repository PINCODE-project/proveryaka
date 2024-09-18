import { FullUserInfoResponse } from '@entities/user';

import { estimateHttp } from '@shared/config/axios';

export function editUser(data: Partial<FullUserInfoResponse>): Promise<void> {
    const body: Partial<FullUserInfoResponse> = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        status: data.status,
        email: data.email,
        academicGroup: data.academicGroup,
        position: data.position,
        avatar: data.avatar,
    };

    return estimateHttp.patch('user', body).then();
};
