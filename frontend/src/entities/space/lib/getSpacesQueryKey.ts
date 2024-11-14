import { ListFilters } from '@shared/types';

export function getSpacesQueryKey(
    filters?: ListFilters,
): (string | ListFilters)[] {
    return [
        'spaces/get',
        filters,
    ].filter(Boolean) as (string | ListFilters)[];
}
