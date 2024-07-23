import { ListFilters } from '@shared/types';

export function getIssueCriteriaQueryKey(issueId: string, filters: ListFilters) {
    return ['issue-criteria-all/get', issueId, filters];
}
