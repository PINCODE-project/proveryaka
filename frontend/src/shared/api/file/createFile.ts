import { estimateHttp } from '../../config/axios';

export function createFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    return estimateHttp.post<File>('files/create', formData).then();
}
