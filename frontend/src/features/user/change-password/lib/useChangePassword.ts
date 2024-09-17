import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { changePassword } from '../api/changePassword';
import { ChangePassword } from '../model/ChangePassword';

export function useChangePassword(options?: AxiosUseMutationOptions<void, ChangePassword>) {
    return useMutation(
        (data: ChangePassword) => changePassword(data),
        options,
    );
};
