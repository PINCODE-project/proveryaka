import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function getSolution(solutionId: string): Promise<GetSolutionForExpert> {
    return solutionHttp.get<GetSolutionForExpert>(`solution/${solutionId}`)
        .then(extractData);
}
