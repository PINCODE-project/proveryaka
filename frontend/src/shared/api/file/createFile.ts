import { extractData } from '@shared/lib';

import { estimateHttp } from '../../config/axios';

export function createFile(file: File): Promise<{id: string}> {
    const formData = new FormData();
    formData.append('file', file);

    return estimateHttp.post<{id: string}>('files/create', formData).then(extractData);
}
