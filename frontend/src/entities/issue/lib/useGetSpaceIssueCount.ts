import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceIssueCountQueryKey } from './getSpaceIssueCountQueryKey';
import { getSpaceIssueCount } from '../api/getSpaceIssueCount';
import { GetIssueCountResponse } from '../model/GetIssueCountResponse';
import { GetIssueFilters } from '../model/GetIssueFilters';

export function useGetSpaceIssueCount(
    spaceId: string,
    filters?: GetIssueFilters,
    options?: AxiosUseQueryOptions<GetIssueCountResponse>,
) {
    return useQuery(getSpaceIssueCountQueryKey(spaceId, filters), () => getSpaceIssueCount(spaceId, filters), options);
}
