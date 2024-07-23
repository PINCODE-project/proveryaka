import { useMutation } from 'react-query';

import { refreshToken } from '@features/auth/refresh-token/api/refreshToken';

import { Token } from '@shared/lib';
import { AxiosUseMutationOptions } from '@shared/types';

export function useRefreshToken(options?: AxiosUseMutationOptions<Token | null, void>) {
    return useMutation(refreshToken, options);
}
