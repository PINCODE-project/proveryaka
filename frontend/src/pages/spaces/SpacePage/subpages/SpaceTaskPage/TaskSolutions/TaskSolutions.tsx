import { FC, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { GetIssueResponse } from '@entities/issue';
import { SolutionCard } from '@entities/solution';
import { getSolutionStatus } from '@entities/solution/lib/getSolutionStatus';
import { useGetIssueSolutions } from '@entities/solution/lib/useGetIssueSolutions';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './TaskSolutions.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    issue: GetIssueResponse;
}>;

export const TaskSolutions: FC<Props> = typedMemo(function TaskSolutions({
    className,
    issue,
    'data-testid': dataTestId = 'TaskSolutions',
}) {
    const spaceId = useSpaceId();
    const [filters] = useListFilters({ page: 0, count: 15 });

    const { data: rawSolutions } = useGetIssueSolutions(issue.id, filters);
    const solutions = useMemo(() => rawSolutions?.map(solution => ({
        ...solution,
        status: getSolutionStatus(solution),
    })), [rawSolutions]);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {
                solutions?.map(solution => (
                    <NavLink
                        key={solution.id}
                        to={SpaceRouter.TaskWork(spaceId ?? '', solution.issueId, solution.id)}
                        className={getBemClasses(styles, 'workLink')}
                    >
                        <SolutionCard
                            solution={solution}
                            className={getBemClasses(styles, 'task')}
                            showSpaceName={false}
                        />
                    </NavLink>
                ))
            }
        </FlexContainer>
    );
});
