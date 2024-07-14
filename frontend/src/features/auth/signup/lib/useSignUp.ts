import { useMutation } from 'react-query';

import { Token } from '@shared/lib';
import { AxiosUseMutationOptions } from '@shared/types';

import { signUp } from '../api/signUp';
import { SignUp } from '../model/SignUp';

export function useSignUp(options?: AxiosUseMutationOptions<Token, SignUp>) {
    return useMutation(signUp, options);
};
