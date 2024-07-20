import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { enterSpaceByCode } from '../api/enterSpaceByCode';

export function useEnterByCode(options?: AxiosUseMutationOptions<void, string>) {
    return useMutation((inviteCode: string) => enterSpaceByCode(inviteCode), options);
}
