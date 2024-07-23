import { ListFilters } from '@shared/types';

export function getIssueExamplesQueryKey(issueId: string, filters: ListFilters) {
    return ['issue-examples-all/get', issueId, filters];
}
