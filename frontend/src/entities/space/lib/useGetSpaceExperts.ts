import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceExpertsQueryKey } from './getSpaceExpertsQueryKey';
import { getSpaceExperts } from '../api/getSpaceExperts';
import { GetExpertsListResponse } from '../model/GetExpertResponse';

export function useGetSpaceExperts(spaceId: string, options?: AxiosUseQueryOptions<GetExpertsListResponse>) {
    return useQuery(getSpaceExpertsQueryKey(spaceId), () => getSpaceExperts(spaceId), options);
}
