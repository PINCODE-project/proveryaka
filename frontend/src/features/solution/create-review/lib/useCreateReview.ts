import { useMutation } from 'react-query';

import { createReview } from '@features/solution/create-review/api/createReview';
import { CriteriaReview } from '@features/solution/create-review/model/CriteriaReview';

import { AxiosUseMutationOptions } from '@shared/types';

export function useCreateReview(options?: AxiosUseMutationOptions<void, CriteriaReview>) {
    return useMutation(
        (data: CriteriaReview) => createReview(data),
        options,
    );
}
