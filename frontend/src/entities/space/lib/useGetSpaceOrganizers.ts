import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceOrganizers } from '../api/getSpaceOrganizers';
import { getSpaceOrganizerQueryKey } from '../lib/getSpaceOrganizerQueryKey';
import { GetOrganizerListResponse } from '../model/GetOrganizerResponse';
import { SpaceUsersParams } from '../model/SpaceUsersParams';

export function useGetSpaceOrganizers(spaceId: string, filters?: SpaceUsersParams, options?: AxiosUseQueryOptions<GetOrganizerListResponse>) {
    return useQuery(getSpaceOrganizerQueryKey(spaceId, filters), () => getSpaceOrganizers(spaceId, filters), options);
}
