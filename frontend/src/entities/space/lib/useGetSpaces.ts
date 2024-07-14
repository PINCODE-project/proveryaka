import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';

import { getSpacesQueryKey } from './getSpacesQueryKey';
import { GetSpaceFilters, getSpaces } from '../api/getSpaces';
import { GetSpaceResponse } from '../model/GetSpaceResponse';

export function useGetSpaces(filters: GetSpaceFilters, options?: AxiosUseQueryOptions<GetListResponse<GetSpaceResponse>>) {
    return useQuery(getSpacesQueryKey, () => getSpaces(filters), options);
}
