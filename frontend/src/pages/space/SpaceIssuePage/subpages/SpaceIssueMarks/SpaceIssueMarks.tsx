import { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { GetReviews, SolutionMarksTable } from '@entities/solution';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { useRolesCheck } from '@entities/space';

import { useIssueId } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceIssueMarks.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceIssueMarks: FC<Props> = typedMemo(function SpaceIssueMarks() {
    const { isStudent } = useRolesCheck();

    const spaceId = useSpaceId();
    const issueId = useIssueId();
    const { data: solution } = useGetStudentIssueSolution(issueId ?? '', {
        enabled: isStudent,
        useErrorBoundary: false,
        onError: () => {

        },
    });
    const actionRender = useCallback((_: string, record: GetReviews) => 'Feedback', []);

    if (!isStudent) {
        return <Navigate to={SpaceRouter.SpaceIssueDescription(spaceId ?? '', issueId ?? '')} />;
    }
    return (
        <SolutionMarksTable
            solutionId={solution?.id ?? ''}
            actionRender={actionRender}
            placeholder="Оценки еще не выставлены"
            canChangeMarkType={true}
        />
    );
});
