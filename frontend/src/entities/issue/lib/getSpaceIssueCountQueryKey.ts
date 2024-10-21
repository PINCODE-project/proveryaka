import { ListFilters } from '@shared/types';

import { GetIssueFilters } from '../model/GetIssueFilters';

export function getSpaceIssueCountQueryKey(spaceId: string, filters?: GetIssueFilters): (string|ListFilters)[] {
    return ['space-issue/get-count', spaceId, filters].filter(Boolean) as (string|ListFilters)[];
}
