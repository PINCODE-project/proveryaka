import { useQuery } from 'react-query';

import { getUserAll } from '@entities/user/api/getUserAll';
import { FullUserInfoList } from '@entities/user/model/FullUserInfoList';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetUserAll(options?: AxiosUseQueryOptions<FullUserInfoList>) {
    return useQuery(['user-all/get'], getUserAll, options);
}
