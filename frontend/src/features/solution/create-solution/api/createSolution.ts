import { CreateSolution } from '@features/solution/create-solution/model/CreateSolution';

import { solutionHttp } from '@shared/config/axios';

export function createSolution(issueId: string, data: CreateSolution): Promise<void> {
    return solutionHttp.post(`student/solution/issue/${issueId}`, data).then();
};
