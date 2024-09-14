import { useQuery } from 'react-query';

import { AxiosUseQueryOptions } from '@shared/types';

import { getTeamQueryKey } from './getTeamQueryKey';
import { getTeam } from '../api/getTeam';
import { GetTeam } from '../model/GetTeam';

export function useGetTeam(teamId: string, options?: AxiosUseQueryOptions<GetTeam>) {
    return useQuery(getTeamQueryKey(teamId), () => getTeam(teamId), options);
};
