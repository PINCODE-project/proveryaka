import { useMemo } from 'react';

import { useGetSolutions } from '@entities/solution/lib/useGetSolutions';

export function useCanReviewSolution(solutionId: string, spaceId: string) {
    const { data: solutions } = useGetSolutions(spaceId);

    return useMemo(() => solutions?.findIndex(solution => solution.id === solutionId) !== -1,
        [solutionId, solutions]);
}
