import { useQuery } from 'react-query';

import { getIssueExamples } from '@entities/example/issue-example/api/getIssueExamples';
import { getIssueExamplesQueryKey } from '@entities/example/issue-example/lib/getIssueExamplesQueryKey';
import { GetIssueExample } from '@entities/example/issue-example/model/GetIssueExample';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

export function useGetIssueExamples(issueId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetIssueExample>>) {
    return useQuery(getIssueExamplesQueryKey(issueId, filters), () => getIssueExamples(issueId, filters), options);
}
