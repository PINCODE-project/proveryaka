import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetSolutionReviews } from '../model/GetSolutionReviews';

export function getSolutionReviews(solutionId: string): Promise<GetSolutionReviews> {
    return solutionHttp.get<GetSolutionReviews>(`organizer/solution/${solutionId}/reviews`)
        .then(extractData);
}
