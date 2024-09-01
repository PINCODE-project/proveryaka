import { GetSolutionReviews } from '@entities/solution/model/GetSolutionReviews';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getStudentSolutionReviews(solutionId: string): Promise<GetSolutionReviews> {
    return solutionHttp.get<GetSolutionReviews>(`student/studentsolution/${solutionId}/reviews`)
        .then(extractData);
}
