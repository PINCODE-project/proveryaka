import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getOrganizerSolution(solutionId: string): Promise<GetSolutionForExpert> {
    return solutionHttp.get<GetSolutionForExpert>(`organizer/solution/${solutionId}`)
        .then(extractData);
}
