import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getUserIsOrganizer } from '../api/getUserIsOrganizer';

export function useGetUserIsOrganizer(options?: AxiosUseQueryOptions<boolean>) {
    return useQuery('user/role', getUserIsOrganizer, options);
}
