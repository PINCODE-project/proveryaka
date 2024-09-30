import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getSpaceUserTeamsQueryKey } from './getSpaceUserTeamsQueryKey';
import { getSpaceUserTeams } from '../api/getSpaceUserTeams';
import { GetTeamFilters } from '../model/GetTeamFilters';
import { GetTeamList } from '../model/GetTeamList';

export function useGetSpaceUserTeams(spaceId: string, filters?: GetTeamFilters, options?: AxiosUseQueryOptions<GetTeamList>) {
    const queryKey = useMemo(() => getSpaceUserTeamsQueryKey(spaceId), [spaceId]);

    return useQuery(queryKey, () => getSpaceUserTeams(spaceId, filters), options);
};
