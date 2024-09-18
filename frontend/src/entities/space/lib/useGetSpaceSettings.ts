import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceSettings } from '../api/getSpaceSettings';
import { SpaceSettings } from '../model/SpaceSettings';

export function useGetSpaceSettings(spaceId: string, options?: AxiosUseQueryOptions<SpaceSettings>) {
    return useQuery('space-settings/get', () => getSpaceSettings(spaceId), options);
}
