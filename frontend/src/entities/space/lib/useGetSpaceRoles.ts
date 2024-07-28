import { useQuery } from 'react-query';

import { getSpaceRoles } from '@entities/space/api/getSpaceRoles';
import { GetSpaceUserRole } from '@entities/space/model/GetSpaceUserRole';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSpaceRoles(spaceId: string, options?: AxiosUseQueryOptions<GetSpaceUserRole>) {
    return useQuery(['space-role/get'], () => getSpaceRoles(spaceId), {
        ...options,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
