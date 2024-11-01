import { ListFilters } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

export function getSpaceIssueQueryKey(
    spaceId: string,
    filters?: ListFilters,
    sorting?: ListSorting,
): (string | ListFilters | ListSorting)[] {
    return [
        'space-issue/get',
        spaceId,
        filters,
        sorting,
    ].filter(Boolean) as (string | ListFilters | ListSorting)[];
}
