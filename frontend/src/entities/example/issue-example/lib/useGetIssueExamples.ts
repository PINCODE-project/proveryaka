import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse, ListFilters } from '@shared/types';

import { getIssueExamplesQueryKey } from './getIssueExamplesQueryKey';
import { getIssueExamples } from '../api/getIssueExamples';
import { GetIssueExample } from '../model/GetIssueExample';

export function useGetIssueExamples(issueId: string, filters?: ListFilters, options?: AxiosUseQueryOptions<GetListResponse<GetIssueExample>>) {
    return useQuery(getIssueExamplesQueryKey(issueId, filters), () => getIssueExamples(issueId, filters), options);
}
