import { useQuery } from 'react-query';

import { getSpaceTeams } from '@entities/team/api/getSpaceTeams';
import { GetTeamList } from '@entities/team/model/GetTeamList';

import { AxiosUseQueryOptions, ListFilters } from '@shared/types';

export function useGetSpaceTeams(spaceId: string, filters: ListFilters, options?: AxiosUseQueryOptions<GetTeamList>) {
    return useQuery(['space-teams/get'], () => getSpaceTeams(spaceId, filters), options);
};
