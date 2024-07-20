import { estimateHttp } from '../../config/axios';
import { extractData, replaceIfEmpty } from '../../lib';

export function getFile(fileId: string): Promise<File | null> {
    return estimateHttp.get<File>(`files/${fileId}`, { responseType: 'blob' })
        .then(extractData)
        .then(replaceIfEmpty<File | null>(null));
}
