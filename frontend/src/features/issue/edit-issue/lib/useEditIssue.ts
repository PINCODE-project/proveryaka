import { useMutation } from 'react-query';

import { editIssue } from '@features/issue/edit-issue/api/editIssue';

import { GetIssueResponse } from '@entities/issue';

import { AxiosUseMutationOptions } from '@shared/types';

export function useEditIssue(options?: AxiosUseMutationOptions<void, GetIssueResponse>) {
    return useMutation(
        (data: GetIssueResponse) => editIssue(data),
        options,
    );
}
