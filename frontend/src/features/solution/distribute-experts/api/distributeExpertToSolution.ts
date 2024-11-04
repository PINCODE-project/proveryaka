import { solutionHttp } from '@shared/config/axios';

import { SetExpertToSolutionRequest } from '../model/SetExpertToSolutionRequest';

export function distributeExpertToSolution(data: SetExpertToSolutionRequest): Promise<void> {
    return solutionHttp.post('distribution/expert', data).then();
}
