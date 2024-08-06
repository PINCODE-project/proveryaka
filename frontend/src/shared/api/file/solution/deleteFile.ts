import { solutionHttp } from '@shared/config/axios';

export function deleteFile(fileId: string): Promise<void> {
    return solutionHttp.delete<File>(`files/${fileId}`)
        .then();
}
