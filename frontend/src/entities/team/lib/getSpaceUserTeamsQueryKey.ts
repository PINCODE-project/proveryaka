import { GetTeamFilters } from '../model/GetTeamFilters';

export function getSpaceUserTeamsQueryKey(spaceId?: string, filters?: GetTeamFilters) {
    return ['space-teams-user/get', spaceId, filters?.teamType, filters?.page, filters?.count].filter(Boolean);
}
