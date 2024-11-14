import { ListFilters } from '@shared/types';
import { ListSorting } from '@shared/types/ListSorting';

export function getSpaceStudentIssueQueryKey(
    spaceId: string,
    filters?: ListFilters,
    sorting?: ListSorting,
): (string | ListFilters | ListSorting)[] {
    return [
        'space-issue/student/get',
        spaceId,
        filters,
        sorting,
    ].filter(Boolean) as (string | ListFilters | ListSorting)[];
}
