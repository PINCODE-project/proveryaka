import { ListFilters } from '@shared/types';

export function getSpacesCountQueryKey(
    filters?: ListFilters,
): (string | ListFilters)[] {
    return [
        'spaces/get-count',
        filters,
    ].filter(Boolean) as (string | ListFilters)[];
}
