import { getFile } from '../api';

export async function getFileUrl(fileId: string | null): Promise<string | null> {
    if (!fileId) {
        return null;
    }
    const file = await getFile(fileId);
    if (!file) {
        return null;
    }
    return URL.createObjectURL(file);
}
