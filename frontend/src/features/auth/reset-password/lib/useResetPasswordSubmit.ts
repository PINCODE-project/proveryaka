import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { resetPasswordSubmit } from '../api/resetPasswordSubmit';
import { ResetPasswordSubmit } from '../model/ResetPasswordSubmit';

type Arguments = {
    token: string;
    body: ResetPasswordSubmit;
};

export function useResetPasswordSubmit(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation(
        (args: Arguments) => resetPasswordSubmit(args.token, args.body),
        options);
}
