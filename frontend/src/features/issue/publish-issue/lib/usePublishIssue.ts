import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { publishIssue } from '../api/publishIssue';

export type PublishIssueArguments = {
    id: string;
    name: string;
};

export function usePublishIssue(options?: AxiosUseMutationOptions<boolean, PublishIssueArguments>) {
    return useMutation((issue: PublishIssueArguments) => publishIssue(issue.id), options);
}
