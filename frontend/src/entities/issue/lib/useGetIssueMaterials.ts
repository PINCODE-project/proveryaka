import { useQuery } from 'react-query';

import { AxiosUseQueryOptions, GetListResponse } from '@shared/types';

import { getIssueMaterials } from '../api/getIssueMaterials';
import { GetIssueMaterial } from '../model/GetIssueMaterial';

export function useGetIssueMaterials(
    issueId: string,
    options?: AxiosUseQueryOptions<GetListResponse<GetIssueMaterial>>,
) {
    return useQuery(['issue-materials/get', issueId], () => getIssueMaterials(issueId), options);
}
