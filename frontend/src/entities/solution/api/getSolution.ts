import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

import { GetSolutionForExpert } from '../model/GetSolutionForExpert';

export function getSolution(solutionId: string): Promise<GetSolutionForExpert> {
    return solutionHttp.get<GetSolutionForExpert>(`solution/${solutionId}`)
        .then(extractData);
}
