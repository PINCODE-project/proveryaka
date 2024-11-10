import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getAllIssueSolutionsCount(spaceId: string, filters?: ListFilters): Promise<number> {
    return solutionHttp.get<{
        count: number;
    }>('organizer/solution/count', {
        params: {
            spaceId,
            ...filters,
            page: filters?.page ? filters.page - 1 : filters?.page,
        },
    })
        .then(extractData)
        .then(data => data.count ?? 0);
}
