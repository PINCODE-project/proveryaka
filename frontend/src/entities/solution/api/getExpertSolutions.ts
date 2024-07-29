import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getExpertSolutions(spaceId: string, filters: ListFilters): Promise<GetSolutionForExpert[]> {
    return solutionHttp.get<{solutionList: GetSolutionForExpert[]}>('expert/solution/all', { params: { spaceId, ...filters } })
        .then(extractData)
        .then(data => data.solutionList ?? []);
};
