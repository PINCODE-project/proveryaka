import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { SolutionCard } from '@entities/solution';
import { getSolutionStatus } from '@entities/solution/lib/getSolutionStatus';
import { useGetExpertSolutions } from '@entities/solution/lib/useGetExpertSolutions';
import { useHasCurrentUserMark } from '@entities/solution/lib/useHasCurrentUserMark';
import { SolutionStatus } from '@entities/solution/model/SolutionStatus';
import { TaskStatus } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, NavTab } from '@shared/ui';

import styles from './SpaceSolutionsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionsPage: FC<Props> = typedMemo(function SpaceSolutionsPage({
    className,
    'data-testid': dataTestId = 'SpaceSolutionsPage',
}) {
    const { isOrganizer } = useRolesCheck();
    const spaceId = useSpaceId();
    const [filters] = useListFilters();
    const [status, setStatus] = useState(SolutionStatus.InGrade);
    const [search, setSearch] = useState('');

    const { data: rawSolutions } = useGetExpertSolutions(spaceId ?? '', filters);

    const solutions = useMemo(() => rawSolutions?.map(solution => ({
        ...solution,
        status: getSolutionStatus(solution),
    })), [rawSolutions]);

    return (
        <FlexContainer
            direction="column"
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="row"
                overflow="nowrap"
                alignItems="center"
                gap="l"
                justifyContent="space-between"
                className={getBemClasses(styles, 'header')}
            >
                <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    alignItems="center"
                    gap="l"
                >
                    <NavTab
                        isActive={status === SolutionStatus.InGrade}
                        name="На проверке"
                        onClick={() => setStatus(SolutionStatus.InGrade)}
                    />
                    <NavTab
                        isActive={status === SolutionStatus.OverdueGrade}
                        name="Просрочена проверка"
                        onClick={() => setStatus(SolutionStatus.OverdueGrade)}
                    />
                </FlexContainer>

                {/* <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    alignItems="center"
                    gap="m"
                >
                    <Input
                        placeholder="Поиск..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        onBlur={event => setSearch(event.target.value.trim())}
                    />
                </FlexContainer> */}
            </FlexContainer>

            <FlexContainer
                gap="m"
                direction="column"
                className={getBemClasses(styles, 'tasks')}
            >
                {
                    solutions?.map((solution, index) => (
                        solution.status !== status
                            ? null
                            : <NavLink
                                key={solution.id}
                                to={SpaceRouter.TaskWork(spaceId ?? '', solution.issueId, solution.id)}
                                className={getBemClasses(styles, 'workLink')}
                            >
                                <SolutionCard
                                    order={index + 1}
                                    showOrder={true}
                                    showAvatar={false}
                                    showGradingCount={isOrganizer}
                                    showActions={isOrganizer}
                                    solution={solution}
                                    className={getBemClasses(styles, 'task')}
                                    showSpaceName={false}
                                />
                            </NavLink>
                    ))
                }
            </FlexContainer>
        </FlexContainer>
    );
});
