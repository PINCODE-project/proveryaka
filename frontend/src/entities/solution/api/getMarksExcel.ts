import { solutionHttp } from '@shared/config/axios';
import { replaceIfEmpty } from '@shared/lib';

export function getMarksExcel(issueId: string): Promise<File | null> {
    return solutionHttp.get(`organizer/solution/${issueId}/excel`, { responseType: 'blob' })
        .then(response => {
            const match = response.headers['content-disposition'].match(/filename=([^;]+)/)?.[1] ?? '';
            return new File([response.data], match.replaceAll('"', ''));
        })
        .then(replaceIfEmpty<File | null>(null));
};
