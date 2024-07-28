import { CriteriaReview } from '@features/solution/create-review/model/CriteriaReview';

import { solutionHttp } from '@shared/config/axios';

export function createReview(data: CriteriaReview): Promise<void> {
    return solutionHttp.post('expert/review/create', data).then();
}
