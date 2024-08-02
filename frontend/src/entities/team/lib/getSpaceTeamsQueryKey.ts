import { ListFilters } from '@shared/types';

export function getSpaceTeamsQueryKey(spaceId?: string, filters?: ListFilters) {
    return ['space-teams/get', spaceId, filters].filter(Boolean);
}
