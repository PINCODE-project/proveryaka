import { solutionHttp } from '@shared/config/axios';

import { replaceIfEmpty } from '../../../lib';

export function getFile(fileId: string): Promise<File | null> {
    return solutionHttp.get<File>(`files/${fileId}`, { responseType: 'blob' })
        .then(response => {
            const match = response.headers['content-disposition'].match(/filename=([^;]+)/)?.[1] ?? '';
            return new File([response.data], match);
        })
        .then(replaceIfEmpty<File | null>(null));
}
