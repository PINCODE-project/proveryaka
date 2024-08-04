import { estimateHttp } from '../../config/axios';

export function updateFile(fileId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return estimateHttp.put<File>(`files/uupdate?id=${fileId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then();
}
