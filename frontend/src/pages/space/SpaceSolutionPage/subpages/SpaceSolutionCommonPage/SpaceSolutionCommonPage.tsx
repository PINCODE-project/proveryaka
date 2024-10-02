import { FC, useMemo } from 'react';

import { useGetIssueFormList } from '@entities/issue';
import { IssueForm } from '@entities/issue/ui/IssueForm';
import { useGetSolution, useGetStudentSolution } from '@entities/solution';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceSolutionCommonPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    isReview?: boolean;
}>;

export const SpaceSolutionCommonPage: FC<Props> = typedMemo(function SpaceSolutionCommonPage({
    isReview,
}) {
    const solutionId = useSolutionId();
    const { data: solutionData } = useGetSolution(solutionId ?? '', { enabled: isReview });
    const { data: studentSolutionData } = useGetStudentSolution(solutionId ?? '', { enabled: !isReview });
    const solution = useMemo(() => isReview ? solutionData : studentSolutionData,
        [isReview, solutionData, studentSolutionData]);

    const { data: issue } = useGetIssueFormList(solution?.issueId ?? '', { enabled: Boolean(solution) });

    if (!solution) {
        return null;
    }
    return (
        <div className={styles.root}>
            <IssueForm
                formList={issue?.issueFormList ?? []}
                initialValue={solution}
            />
        </div>
    );
});
