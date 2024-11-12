import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { getMarksExcel } from '../api/getMarksExcel';

export function useGetMarksExcel(options?: AxiosUseMutationOptions<File | null, string>) {
    return useMutation((issueId: string) => getMarksExcel(issueId), options);
}
