import { ListFilters } from '@shared/types';

export function getSpaceUserTeamsQueryKey(spaceId: string, filters?: ListFilters) {
    return ['space-teams-user/get', spaceId, filters].filter(Boolean);
}
