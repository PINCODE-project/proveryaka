import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

import { getSpacesQueryKey } from './getSpacesQueryKey';
import { getSpaces } from '../api/getSpaces';
import { GetSpaceResponse } from '../model/GetSpaceResponse';

export function useGetSpaces(filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetSpaceResponse>>) {
    return useQuery(getSpacesQueryKey(filters), () => getSpaces(filters), options);
}
