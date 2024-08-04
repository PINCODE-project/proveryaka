import { useMemo } from 'react';

import { useGetExpertSolutions } from '@entities/solution/lib/useGetExpertSolutions';

import { useListFilters } from '@shared/hooks';

export function useCanReviewSolution(solutionId: string, spaceId: string) {
    const [filters] = useListFilters();
    const { data: solutions } = useGetExpertSolutions(spaceId, filters);

    return useMemo(() => solutions?.findIndex(solution => solution.id === solutionId) !== -1,
        [solutionId, solutions]);
}
