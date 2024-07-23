import dayjs from 'dayjs';

import { GetIssueResponse } from '@entities/issue';
import { IssueStatus } from '@entities/issue/model/IssueStatus';

export function getIssueStatus(issue: GetIssueResponse): IssueStatus {
    const workDeadline = dayjs(issue.assessmentDeadlineDateUtc).toDate();
    const gradeDeadline = dayjs(issue.submitDeadlineDateUtc).toDate();
    const now = new Date();

    if (now < workDeadline) {
        return IssueStatus.InWork;
    }
    if (now < gradeDeadline) {
        return IssueStatus.InGrade;
    }
    if (issue.reviewedSolutionCount < issue.allSolutionCount) {
        return IssueStatus.OverdueGrade;
    }
    return IssueStatus.Done;
}
