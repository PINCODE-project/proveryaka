import { CreateDistribution } from '@features/issue/start-distribution/model/CreateDistribution';

import { solutionHttp } from '@shared/config/axios';

export function startDistribution(data: CreateDistribution): Promise<void> {
    return solutionHttp.post('distribution/start', data)
        .then();
}
