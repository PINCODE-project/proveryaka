import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { resetPassword } from '../api/resetPassword';
import { ResetPassword } from '../model/ResetPassword';

export function useResetPassword(options?: AxiosUseMutationOptions<void, ResetPassword>) {
    return useMutation(resetPassword, options);
}
