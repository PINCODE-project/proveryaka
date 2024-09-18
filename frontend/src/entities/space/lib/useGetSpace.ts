import { useQuery } from 'react-query';

import { Space } from '@entities/space';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpace } from '../api/getSpace';
import { getSpaceQueryKey } from '../lib/getSpaceQueryKey';

export function useGetSpace(spaceId: string | number, options?: AxiosUseQueryOptions<Space>) {
    return useQuery(getSpaceQueryKey(spaceId), () => getSpace(spaceId), options);
}
