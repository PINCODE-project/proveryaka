import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getUserAll } from '../api/getUserAll';
import { FullUserInfoList } from '../model/FullUserInfoList';

export function useGetUserAll(options?: AxiosUseQueryOptions<FullUserInfoList>) {
    return useQuery(['user-all/get'], getUserAll, options);
}
