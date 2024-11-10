import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceExpertsQueryKey } from './getSpaceExpertsQueryKey';
import { getSpaceExperts } from '../api/getSpaceExperts';
import { GetExpertsListResponse } from '../model/GetExpertResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function useGetSpaceExperts(spaceId: string, filters?: SpaceUsersParams, options?: AxiosUseQueryOptions<GetExpertsListResponse>) {
    return useQuery(getSpaceExpertsQueryKey(spaceId, filters), () => getSpaceExperts(spaceId, filters), options);
}
