import dayjs from 'dayjs';

import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';
import { SolutionStatus } from '@entities/solution/model/SolutionStatus';

export function getSolutionStatus(solution: GetSolutionForExpert, hasReview?: boolean): SolutionStatus {
    const gradeDeadline = dayjs(solution.assessmentDeadlineDateUtc).toDate();
    const now = new Date();

    if (now < gradeDeadline) {
        if (hasReview) {
            return SolutionStatus.Done;
        }
        return SolutionStatus.InGrade;
    }
    if (solution.checksCountMax < solution.reviewCount) {
        return SolutionStatus.OverdueGrade;
    }
    return SolutionStatus.Done;
}
