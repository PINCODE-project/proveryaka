import { FC } from 'react';

import { CreateReviewForm } from '@features/solution/create-review/ui/CreateReviewForm';

import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { useGetIssue } from '@entities/issue';

import { useIssueId, useListFilters } from '@shared/hooks';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './SolutionReview.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SolutionReview: FC<Props> = typedMemo(function SolutionReview({
    className,
    'data-testid': dataTestId = 'SolutionReview',
}) {
    const solutionId = useSolutionId();
    const issueId = useIssueId();

    const { data: issue } = useGetIssue(issueId ?? '');
    const [filters] = useListFilters();
    const { data: criteria } = useGetIssueCriteria(issue?.id ?? '', filters);

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
            <CreateReviewForm solutionId={solutionId ?? ''} issue={issue} criteria={criteria.entityList ?? []} />
        </FlexContainer>
    );
});
