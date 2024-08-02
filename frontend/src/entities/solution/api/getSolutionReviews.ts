import { GetSolution } from '@entities/solution/model/GetSolution';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSolutionReviews(solutionId: string): Promise<GetSolution> {
    return solutionHttp.get<GetSolution>(`student/solution/${solutionId}`)
        .then(extractData);
}
