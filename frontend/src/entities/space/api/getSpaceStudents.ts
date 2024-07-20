import { estimateHttp } from '@shared/config/axios';
import { extractData, replaceIfEmpty } from '@shared/lib';

import { GetStudentListResponse } from '../model/GetStudentResponse';

export function getSpaceStudents(spaceId: string): Promise<GetStudentListResponse> {
    return estimateHttp.get<GetStudentListResponse>(`/space/${spaceId}/student`)
        .then(extractData)
        .then(replaceIfEmpty<GetStudentListResponse>({ studentInfoList: [] }));
};
