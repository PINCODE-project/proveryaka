import { ListFilters } from '@shared/types';

export function getIssueCriteriaWithExamplesQueryKey(issueId: string, filters?: ListFilters) {
    return ['issue-criteria-all/get/with-examples', issueId, filters].filter(Boolean);
}
