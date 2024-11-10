import { solutionHttp } from '@shared/config/axios';

export function deleteSolution(solutionId: string): Promise<void> {
    return solutionHttp.delete(`student/solution/${solutionId}`).then();
};
