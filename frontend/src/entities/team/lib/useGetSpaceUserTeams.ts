import { useQuery } from 'react-query';

import { getSpaceTeams } from '@entities/team/api/getSpaceTeams';
import { getSpaceUserTeamsQueryKey } from '@entities/team/lib/getSpaceUserTeamsQueryKey';
import { GetTeamList } from '@entities/team/model/GetTeamList';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetSpaceUserTeams(spaceId: string, filters: ListFilters, options?: AxiosUseQueryOptions<GetTeamList>) {
    return useQuery(getSpaceUserTeamsQueryKey(spaceId), () => getSpaceTeams(spaceId, filters), options);
};
