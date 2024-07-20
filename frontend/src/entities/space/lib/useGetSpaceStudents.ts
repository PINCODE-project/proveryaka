import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceStudents } from '../api/getSpaceStudents';
import { getSpaceStudentsQueryKey } from '../lib/getSpaceStudentsQueryKey';
import { GetStudentListResponse } from '../model/GetStudentResponse';

export function useGetSpaceStudents(spaceId: string, options?: AxiosUseQueryOptions<GetStudentListResponse>) {
    return useQuery(getSpaceStudentsQueryKey(spaceId), () => getSpaceStudents(spaceId), options);
}
