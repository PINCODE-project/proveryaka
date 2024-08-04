import { useMemo } from 'react';

import { useGetSolutionReviews } from '@entities/solution/lib/useGetSolutionReviews';

export function useHasCurrentUserMark(solutionId: string, userId: string) {
    const { data: reviews } = useGetSolutionReviews(solutionId);

    return useMemo(() => reviews?.reviews.find(review => review.userId === userId), [reviews, userId]);
}
