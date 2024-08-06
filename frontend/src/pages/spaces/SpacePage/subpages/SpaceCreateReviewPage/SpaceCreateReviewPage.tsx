import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { CreateReviewForm } from '@features/solution/create-review/ui/CreateReviewForm';

import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { useGetIssue } from '@entities/issue';
import { useCanReviewSolution } from '@entities/solution/lib/useCanReviewSolution';
import { useHasCurrentUserMark } from '@entities/solution/lib/useHasCurrentUserMark';
import { useGetCurrentUserInfo } from '@entities/user';

import { useIssueId, useListFilters } from '@shared/hooks';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './SpaceCreateReviewPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceCreateReviewPage: FC<Props> = typedMemo(function SpaceCreateReviewPage({
    className,
    'data-testid': dataTestId = 'SpaceCreateReviewPage',
}) {
    const solutionId = useSolutionId();
    const spaceId = useSpaceId();
    const issueId = useIssueId();
    const { data: user } = useGetCurrentUserInfo();

    const { data: issue } = useGetIssue(issueId ?? '');
    const [filters] = useListFilters();
    const { data: criteria } = useGetIssueCriteria(issue?.id ?? '', filters);

    const canReview = useCanReviewSolution(solutionId ?? '', spaceId ?? '');
    const hasReview = useHasCurrentUserMark(solutionId ?? '', user?.id ?? '');

    if (!canReview || hasReview !== undefined) {
        return <Navigate to={SpaceRouter.Space(spaceId ?? '')} />;
    }
    if (!issue || !criteria) {
        return null;
    }
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <CreateReviewForm
                solutionId={solutionId ?? ''}
                issue={issue}
                criteria={criteria.entityList ?? []}
            />
        </FlexContainer>
    );
});
