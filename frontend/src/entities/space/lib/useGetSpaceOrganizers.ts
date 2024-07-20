import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceOrganizers } from '../api/getSpaceOrganizers';
import { getSpaceOrganizerQueryKey } from '../lib/getSpaceOrganizerQueryKey';
import { GetOrganizerListResponse } from '../model/GetOrganizerResponse';

export function useGetSpaceOrganizers(spaceId: string, options?: AxiosUseQueryOptions<GetOrganizerListResponse>) {
    return useQuery(getSpaceOrganizerQueryKey(spaceId), () => getSpaceOrganizers(spaceId), options);
}
