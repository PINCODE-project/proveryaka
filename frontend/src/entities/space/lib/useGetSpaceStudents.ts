import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceStudents } from '../api/getSpaceStudents';
import { getSpaceStudentsQueryKey } from '../lib/getSpaceStudentsQueryKey';
import { GetStudentListResponse } from '../model/GetStudentResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function useGetSpaceStudents(spaceId: string, filters?: SpaceUsersParams, options?: AxiosUseQueryOptions<GetStudentListResponse>) {
    return useQuery(getSpaceStudentsQueryKey(spaceId, filters), () => getSpaceStudents(spaceId, filters), options);
}
