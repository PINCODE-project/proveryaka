import { useMutation } from 'react-query';

import { startDistribution } from '@features/issue/start-distribution/api/startDistribution';
import { CreateDistribution } from '@features/issue/start-distribution/model/CreateDistribution';

import { AxiosUseMutationOptions } from '@shared/types';

export function useStartDistribution(options?: AxiosUseMutationOptions<void, CreateDistribution>) {
    return useMutation(
        (data: CreateDistribution) => startDistribution(data),
        options,
    );
}
