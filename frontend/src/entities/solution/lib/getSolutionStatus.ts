import dayjs from 'dayjs';

import { GetIssueResponse } from '@entities/issue';
import { GetSolution } from '@entities/solution/model/GetSolution';
import { SolutionStatus } from '@entities/solution/model/SolutionStatus';

export function getSolutionStatus(issue: GetIssueResponse, solution: GetSolution): SolutionStatus {
    const gradeDeadline = dayjs(issue.submitDeadlineDateUtc).toDate();
    const now = new Date();

    if (now < gradeDeadline) {
        return SolutionStatus.InGrade;
    }
    if (issue.reviewedSolutionCount < issue.allSolutionCount) {
        return SolutionStatus.OverdueGrade;
    }
    return SolutionStatus.Done;
}
