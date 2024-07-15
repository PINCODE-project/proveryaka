import { useQuery } from 'react-query';

import { SpaceSettings } from '@entities/space';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpace } from '../api/getSpace';
import { getSpaceQueryKey } from '../lib/getSpaceQueryKey';

export function useGetSpace(spaceId: string, options?: AxiosUseQueryOptions<SpaceSettings>) {
    return useQuery(getSpaceQueryKey(spaceId), () => getSpace(spaceId), options);
}
