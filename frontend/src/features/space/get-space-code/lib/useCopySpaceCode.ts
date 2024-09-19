import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { getSpaceCode } from '../api/getSpaceCode';

export function useCopySpaceCode(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation(
        (spaceId: string) => getSpaceCode(spaceId, false)
            .then(code => window.navigator.clipboard.writeText(code)),
        options);
}
