import { useMutation } from 'react-query';

import { Token } from '@shared/lib';
import { AxiosUseMutationOptions } from '@shared/types';

import { signIn } from '../api/signIn';
import { SignIn } from '../model/SignIn';

export function useSignIn(options?: AxiosUseMutationOptions<Token, SignIn>) {
    return useMutation(signIn, options);
};
