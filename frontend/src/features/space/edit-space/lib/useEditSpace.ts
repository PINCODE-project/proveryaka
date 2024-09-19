import { useMutation } from 'react-query';

import { AxiosUseMutationOptions } from '@shared/types';

import { editSpace } from '../api/editSpace';
import { EditSpaceRequest } from '../model/EditSpaceRequest';

export function useEditSpace(options?: AxiosUseMutationOptions<void, EditSpaceRequest>) {
    return useMutation(editSpace, options);
}
