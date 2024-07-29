import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';
import { GetListResponse, ListFilters } from '@shared/types';

import { GetSolution } from '../model/GetSolution';

export function getAllIssueSolution(issueId: string, filters: ListFilters): Promise<GetListResponse<GetSolution>> {
    return solutionHttp.get<GetListResponse<GetSolution>>('organizer/solution/all', { params: { issueId, ...filters } })
        .then(extractData);
};
