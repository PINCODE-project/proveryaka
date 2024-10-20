import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { getSpaceCode } from '../api/getSpaceCode';

type Arguments = {
    name: string;
    id: string;
};

export function useRegenerateSpaceCode(options?: AxiosUseMutationOptions<string, Arguments>) {
    return useMutation((args: Arguments) => getSpaceCode(args.id, true), options);
}
