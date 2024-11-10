import { useCallback, useState } from 'react';

import { ListFilters } from '@shared/types';

type Filters = ListFilters & {
    [key: string]: any;
};

type ReturnType<TFilters extends Filters> = [
    TFilters,
    (value: Partial<TFilters>) => void
];

export function useListFilters<TFilters extends Filters>(
    initialValue: TFilters = { page: 0, count: 1000 } as TFilters,
): ReturnType<TFilters> {
    const [filters, setFilters] = useState<TFilters>(initialValue);

    const changeFilter = useCallback((value: Partial<TFilters>) => {
        setFilters(filters => ({ ...filters, ...value }));
    }, []);

    return [
        filters,
        changeFilter,
    ];
}
