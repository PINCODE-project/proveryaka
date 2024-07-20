import { estimateHttp } from '../../config/axios';

export function deleteFile(fileId: string): Promise<void> {
    return estimateHttp.delete<File>(`files/${fileId}`)
        .then();
}
