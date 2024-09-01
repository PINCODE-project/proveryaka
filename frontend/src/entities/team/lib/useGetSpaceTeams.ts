import { useQuery } from 'react-query';

import { getSpaceTeams } from '@entities/team/api/getSpaceTeams';
import { getSpaceTeamsQueryKey } from '@entities/team/lib/getSpaceTeamsQueryKey';
import { GetTeamList } from '@entities/team/model/GetTeamList';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetSpaceTeams(spaceId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetTeamList>) {
    return useQuery(getSpaceTeamsQueryKey(spaceId, filters), () => getSpaceTeams(spaceId, filters), options);
};
