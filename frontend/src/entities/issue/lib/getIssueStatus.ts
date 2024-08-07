import dayjs from 'dayjs';

import { GetIssueResponse } from '@entities/issue';
import { IssueStatus } from '@entities/issue/model/IssueStatus';
import { GetSolution } from '@entities/solution/model/GetSolution';

export function getIssueStatus(issue: GetIssueResponse, hasSolution: boolean, isStudent: boolean): IssueStatus {
    const workDeadline = dayjs(issue.submitDeadlineDateUtc).toDate();
    const gradeDeadline = dayjs(issue.assessmentDeadlineDateUtc).toDate();
    const now = new Date();

    if (now < workDeadline && !hasSolution) {
        return IssueStatus.InWork;
    }
    if (now > workDeadline && !hasSolution && isStudent) {
        return IssueStatus.OverdueWork;
    }
    if (now < gradeDeadline || hasSolution) {
        return IssueStatus.InGrade;
    }
    if (issue.reviewedSolutionCount < issue.allSolutionCount) {
        return IssueStatus.OverdueGrade;
    }
    return IssueStatus.Done;
}

export function getStudentIssueStatus(issue: GetIssueResponse, solution: GetSolution): IssueStatus {
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
