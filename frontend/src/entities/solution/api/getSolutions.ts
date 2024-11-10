import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getSolutions(spaceId: string, filters?: ListFilters): Promise<GetSolutionForExpert[]> {
    return solutionHttp.get<{ entityList: GetSolutionForExpert[] }>('solution/all', {
        params: {
            spaceId,
            ...filters,
            page: filters?.page ? filters.page - 1 : filters?.page,
        },
    })
        .then(extractData)
        .then(data => data.entityList ?? []);
};
