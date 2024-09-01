import { useMemo } from 'react';

import { useGetExpertSolutions } from '@entities/solution/lib/useGetExpertSolutions';

export function useCanReviewSolution(solutionId: string, spaceId: string) {
    const { data: solutions } = useGetExpertSolutions(spaceId);

    return useMemo(() => solutions?.findIndex(solution => solution.id === solutionId) !== -1,
        [solutionId, solutions]);
}
