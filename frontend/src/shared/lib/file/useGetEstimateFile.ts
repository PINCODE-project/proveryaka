import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getFile } from '@shared/api';
import { AxiosUseQueryOptions } from '@shared/types';

export function useGetEstimateFile(fileId: string, options: AxiosUseQueryOptions<File>) {
    const queryKey = useMemo(() => ['estimate/file', fileId], [fileId]);

    return useQuery(queryKey, () => getFile(fileId), options);
}
