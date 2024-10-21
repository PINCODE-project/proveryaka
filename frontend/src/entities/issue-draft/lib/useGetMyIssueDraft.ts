import { useQuery } from 'react-query';

import { GetIssueDraftResponse, getMyIssueDraft, getMyIssueDraftQueryKey } from '@entities/issue-draft';

import { AxiosUseQueryOptions } from '@shared/types';

export function useGetMyIssueDraft(spaceId: string, options?: AxiosUseQueryOptions<GetIssueDraftResponse>) {
    return useQuery(getMyIssueDraftQueryKey(spaceId), () => getMyIssueDraft(spaceId), options);
}
