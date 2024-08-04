import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionReviews } from '@entities/solution/model/GetSolutionReviews';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSolutionReviews(solutionId: string): Promise<GetSolutionReviews> {
    return solutionHttp.get<GetSolutionReviews>(`student/solution/${solutionId}/reviews`)
        .then(extractData);
}
