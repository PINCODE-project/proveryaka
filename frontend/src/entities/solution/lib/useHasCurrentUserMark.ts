import { useMemo } from 'react';

import { useGetStudentSolutionReviews } from '@entities/solution/lib/useGetStudentSolutionReviews';

export function useHasCurrentUserMark(solutionId: string, userId: string) {
    const { data: reviews } = useGetStudentSolutionReviews(solutionId);

    return useMemo(() => reviews?.reviews.find(review => review.userId === userId), [reviews, userId]);
}
