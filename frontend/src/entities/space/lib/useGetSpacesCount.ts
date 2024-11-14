import { useQuery } from 'react-query';

import { getSpacesCount } from '@entities/space/api/getSpacesCount';
import { getSpacesCountQueryKey } from '@entities/space/lib/getSpacesCountQueryKey';
import { GetSpaceCountResponse } from '@entities/space/model/GetSpaceCountResponse';
import { GetSpacesFilters } from '@entities/space/model/GetSpacesFilters';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSpacesCount(
    filters?: GetSpacesFilters,
    options?: AxiosUseQueryOptions<GetSpaceCountResponse>,
) {
    return useQuery(getSpacesCountQueryKey(filters), () => getSpacesCount(filters), options);
}
