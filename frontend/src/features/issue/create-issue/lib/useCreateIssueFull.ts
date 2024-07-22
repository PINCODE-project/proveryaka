import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { createIssueFull } from '../api/createIssueFull';
import { CreateInfoWithFullInfo } from '../model/CreateInfoWithFullInfo';

type Arguments = {
    spaceId: string;
    data: Omit<CreateInfoWithFullInfo, 'spaceId'>;
};

export function useCreateIssueFull(options?: AxiosUseMutationOptions<void, Arguments>) {
    return useMutation((args: Arguments) => createIssueFull(args.data, args.spaceId), options);
};
