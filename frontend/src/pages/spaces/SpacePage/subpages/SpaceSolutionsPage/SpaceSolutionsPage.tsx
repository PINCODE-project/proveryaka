import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { SolutionCard } from '@entities/solution';
import { getSolutionStatus } from '@entities/solution/lib/getSolutionStatus';
import { useGetExpertSolutions } from '@entities/solution/lib/useGetExpertSolutions';
import { TaskStatus } from '@entities/space';

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
    const spaceId = useSpaceId();
    const [filters] = useListFilters({ page: 0, count: 15 });
    const [status, setStatus] = useState(TaskStatus.InWork);
    const [search, setSearch] = useState('');

    const { data: rawSolutions } = useGetExpertSolutions(spaceId ?? '', filters);
    const solutions = useMemo(() => rawSolutions?.map(solution => ({
        ...solution,
        // status: getSolutionStatus(solution),
    })), []);

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
                        isActive={status === TaskStatus.InWork}
                        name="К выполнению"
                        onClick={() => setStatus(TaskStatus.InWork)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.OverdueGrade}
                        name="Просрочена сдача"
                        onClick={() => setStatus(TaskStatus.OverdueGrade)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.OnGrade}
                        name="На проверке"
                        onClick={() => setStatus(TaskStatus.OnGrade)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.OverdueGrade}
                        name="Просрочена проверка"
                        onClick={() => setStatus(TaskStatus.OverdueGrade)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.Done}
                        name="Завершенные"
                        onClick={() => setStatus(TaskStatus.Done)}
                    />
                </FlexContainer>

                <FlexContainer
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
                </FlexContainer>
            </FlexContainer>

            <FlexContainer
                gap="m"
                direction="column"
                className={getBemClasses(styles, 'tasks')}
            >
                <NavLink
                    to={SpaceRouter.TaskWork(spaceId ?? '', 0, 0)}
                    className={getBemClasses(styles, 'workLink')}
                >
                    <SolutionCard
                        className={getBemClasses(styles, 'task')}
                        showSpaceName={false}
                    />
                </NavLink>
                <NavLink
                    to={SpaceRouter.TaskWork(spaceId ?? '', 0, 0)}
                    className={getBemClasses(styles, 'workLink')}
                >
                    <SolutionCard
                        className={getBemClasses(styles, 'task')}
                        showOverdueDeadline={false}
                        showSpaceName={false}
                    />
                </NavLink>
                <NavLink
                    to={SpaceRouter.TaskWork(spaceId ?? '', 0, 0)}
                    className={getBemClasses(styles, 'workLink')}
                >
                    <SolutionCard
                        className={getBemClasses(styles, 'task')}
                        showOverdueDeadline={false}
                        showSpaceName={false}
                    />
                </NavLink>
                <NavLink
                    to={SpaceRouter.TaskWork(spaceId ?? '', 0, 0)}
                    className={getBemClasses(styles, 'workLink')}
                >
                    <SolutionCard
                        mark={100}
                        className={getBemClasses(styles, 'task')}
                        showOverdueDeadline={false}
                        showSpaceName={false}
                    />
                </NavLink>
            </FlexContainer>

        </FlexContainer>
    );
});
