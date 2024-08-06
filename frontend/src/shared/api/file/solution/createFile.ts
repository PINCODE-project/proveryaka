import { solutionHttp } from '@shared/config/axios';
import { extractData } from '@shared/lib';

export function createFile(file: File): Promise<{id: string}> {
    const formData = new FormData();
    formData.append('file', file);

    return solutionHttp.post<{id: string}>('files/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(extractData);
}
