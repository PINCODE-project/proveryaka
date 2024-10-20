import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { getSpaceCode } from '../api/getSpaceCode';

type Arguments = {
    name: string;
    id: string;
};

export function useCopySpaceCode(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation(
        (args: Arguments) => getSpaceCode(args.id, false)
            .then(code => window.navigator.clipboard.writeText(code)),
        options);
}
