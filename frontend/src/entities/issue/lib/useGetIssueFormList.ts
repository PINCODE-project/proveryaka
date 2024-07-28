import { useQuery } from 'react-query';

import { getIssueFormList } from '@entities/issue/api/getIssueFormList';
import { getIssueFormQueryKey } from '@entities/issue/lib/getIssueFormQueryKey';
import { GetIssueFormList } from '@entities/issue/model/GetIssueFormList';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetIssueFormList(issueId: string, options?: AxiosUseQueryOptions<GetIssueFormList>) {
    return useQuery(getIssueFormQueryKey(issueId), () => getIssueFormList(issueId), options);
}
