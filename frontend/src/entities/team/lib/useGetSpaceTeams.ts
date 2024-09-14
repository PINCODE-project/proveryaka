import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

import { getSpaceTeamsQueryKey } from './getSpaceTeamsQueryKey';
import { getSpaceTeams } from '../api/getSpaceTeams';
import { GetTeamList } from '../model/GetTeamList';

export function useGetSpaceTeams(spaceId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetTeamList>) {
    const queryKey = useMemo(() => getSpaceTeamsQueryKey(spaceId), [spaceId]);

    return useQuery(queryKey, () => getSpaceTeams(spaceId, filters), options);
};
