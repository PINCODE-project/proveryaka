import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetSolutionReviews } from '../model/GetSolutionReviews';

export function getStudentSolutionReviews(solutionId: string): Promise<GetSolutionReviews> {
    return solutionHttp.get<GetSolutionReviews>(`student/solution/${solutionId}/reviews`)
        .then(extractData);
}
