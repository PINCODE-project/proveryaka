import { ListFilters } from '@shared/types';

export function getSpaceIssueQueryKey(
    spaceId: string,
    filters?: ListFilters,
    orderBy?: number,
    isDesc?: boolean,
): (string | ListFilters)[] {
    return ['space-issue/get', spaceId, filters, orderBy, isDesc].filter(Boolean) as (string | ListFilters)[];
}
