import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { ListFilters } from '@shared/types';

export function getAllIssueSolution(issueId: string, filters?: ListFilters): Promise<GetSolutionForExpert[]> {
    return solutionHttp.get<{solutionList: GetSolutionForExpert[]}>('organizer/solution/all', { params: { issueId, ...filters } })
        .then(extractData)
        .then(data => data.solutionList ?? []);
};
