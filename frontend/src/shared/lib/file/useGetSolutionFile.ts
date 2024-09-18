import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getFile } from '@shared/api/file/solution/getFile';
import { AxiosUseQueryOptions } from '@shared/types';

export function useGetSolutionFile(fileId: string, options?: AxiosUseQueryOptions<File>) {
    const queryKey = useMemo(() => ['solution/file', fileId], [fileId]);

    return useQuery(queryKey, () => getFile(fileId), options);
}
