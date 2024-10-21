import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { deleteIssue } from '../api/deleteIssue';

export function useDeleteIssue(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation((issueId: string) => deleteIssue(issueId), options);
}
