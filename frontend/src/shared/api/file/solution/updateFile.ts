import { solutionHttp } from '@shared/config/axios';

export function updateFile(fileId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return solutionHttp.put<File>(`files/uupdate?id=${fileId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then();
}
