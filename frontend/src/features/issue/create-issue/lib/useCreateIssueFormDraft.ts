import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createIssueFormDraft } from '../api/createIssueFormDraft';
import { CreateIssueFormRequest } from '../model/CreateIssueFormRequest';

type Arguments = {
    spaceId: string;
    data: CreateIssueFormRequest[];
};

export function useCreateIssueFormDraft(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => createIssueFormDraft(args.spaceId, args.data), options);
}
