import { ListFilters } from '@shared/types';

export function getSpaceIssueQueryKey(spaceId: string, filters?: ListFilters): (string|ListFilters)[] {
    return ['space-issue/get', spaceId, filters].filter(Boolean) as (string|ListFilters)[];
}
