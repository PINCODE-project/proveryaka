import { ListFilters } from '@shared/types';

export function getCriteriaExamplesQueryKey(criteriaId: string, filters?: ListFilters) {
    return ['criteria-examples-all/get', criteriaId, filters].filter(Boolean);
}
