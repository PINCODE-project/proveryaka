export function getIssueWithFullInfoQueryKey(issueId: string): string[] {
    return ['issue/get/with-full-info', issueId];
}
