import { useQuery } from 'react-query';

import { GetIssueResponse } from '@entities/issue';
import { getIssueWithFullInfo } from '@entities/issue/api/getIssueWithFullInfo';
import { getIssueWithFullInfoQueryKey } from '@entities/issue/lib/getIssueWithFullInfoQueryKey';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetIssueWithFullInfo(issueId: string, options?: AxiosUseQueryOptions<GetIssueResponse>) {
    return useQuery(getIssueWithFullInfoQueryKey(issueId), () => getIssueWithFullInfo(issueId), options);
}
