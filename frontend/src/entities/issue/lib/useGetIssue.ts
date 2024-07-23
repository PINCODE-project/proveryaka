import { useQuery } from 'react-query';

import { getIssueQueryKey, GetIssueResponse } from '@entities/issue';

import { AxiosUseQueryOptions } from '@shared/types';

import { getIssue } from '../api/getIssue';

export function useGetIssue(issueId: string, options?: AxiosUseQueryOptions<GetIssueResponse>) {
    return useQuery(getIssueQueryKey(issueId), () => getIssue(issueId), options);
}
