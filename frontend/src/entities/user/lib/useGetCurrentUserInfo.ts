import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getCurrentUserInfo } from '../api/getCurrentUserInfo';
import { getCurrentUserQueryKey } from '../lib/getCurrentUserQueryKey';
import { FullUserInfoResponse } from '../model/FullUserInfoResponse';

export function useGetCurrentUserInfo(options?: AxiosUseQueryOptions<FullUserInfoResponse>) {
    return useQuery(getCurrentUserQueryKey, getCurrentUserInfo, options);
}
