import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { GetTeamFilters } from '@entities/team/model/GetTeamFilters';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceTeamsQueryKey } from './getSpaceTeamsQueryKey';
import { getSpaceTeams } from '../api/getSpaceTeams';
import { GetTeamList } from '../model/GetTeamList';

export function useGetSpaceTeams(
    spaceId: string,
    filters?: GetTeamFilters,
    options?: AxiosUseQueryOptions<GetTeamList>,
) {
    const queryKey = useMemo(() => getSpaceTeamsQueryKey(spaceId), [spaceId]);

    return useQuery(queryKey, () => getSpaceTeams(spaceId, filters), options);
}
