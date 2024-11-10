import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetStudentListResponse } from '../model/GetStudentResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function getSpaceStudents(spaceId: string, filters?: SpaceUsersParams): Promise<GetStudentListResponse> {
    return estimateHttp.get<GetStudentListResponse>(`/space/${spaceId}/student`, { params: filters })
        .then(extractData)
        .then(replaceIfEmpty<GetStudentListResponse>({ studentInfoList: [] }));
};
