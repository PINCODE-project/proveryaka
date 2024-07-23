import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { CreateIssueFullForm } from '@features/issue/create-issue/ui/CreateIssueFullForm';

import { useGetSpaceIssue } from '@entities/issue';
import { getIssueStatus } from '@entities/issue/lib/getIssueStatus';
import { IssueStatus } from '@entities/issue/model/IssueStatus';
import { TaskCard } from '@entities/space';
import { useGetSpace } from '@entities/space/lib/useGetSpace';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Input, NavTab } from '@shared/ui';

import styles from './SpaceTasksPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTasksPage: FC<Props> = typedMemo(function SpaceTasksPage({
    className,
    'data-testid': dataTestId = 'SpaceTasksPage',
}) {
    const spaceId = useSpaceId();
    const { data: space } = useGetSpace(spaceId ?? '');

    const [status, setStatus] = useState(IssueStatus.InWork);
    const [search, setSearch] = useState('');
    const [filters, changeFilter] = useListFilters({ page: 0, count: 15 });

    const { data: rawIssues } = useGetSpaceIssue(spaceId ?? '', filters);
    const issues = useMemo(() => rawIssues?.entityList?.map(issue => ({
        ...issue,
        status: getIssueStatus(issue),
    })) ?? [], [rawIssues]);

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
                <CreateIssueFullForm
                    triggerElement={open => (
                        <Button onClick={open}>
                            Создать задание
                        </Button>
                    )}
                    spaceId={spaceId ?? ''}
                />

                <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    alignItems="center"
                    gap="l"
                >
                    <NavTab
                        isActive={status === IssueStatus.InWork}
                        name="К выполнению"
                        onClick={() => setStatus(IssueStatus.InWork)}
                    />
                    <NavTab
                        isActive={status === IssueStatus.InGrade}
                        name="На проверке"
                        onClick={() => setStatus(IssueStatus.InGrade)}
                    />
                    <NavTab
                        isActive={status === IssueStatus.OverdueGrade}
                        name="Просрочена проверка"
                        onClick={() => setStatus(IssueStatus.OverdueGrade)}
                    />
                    <NavTab
                        isActive={status === IssueStatus.Done}
                        name="Завершенные"
                        onClick={() => setStatus(IssueStatus.Done)}
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
                {issues.map(issue => (
                    issue.status === status

                        ? <NavLink
                            to={SpaceRouter.Task(spaceId ?? '', issue.id)}
                            className={getBemClasses(styles, 'taskLink')}
                        >
                            <TaskCard
                                className={getBemClasses(styles, 'task')}
                                showSpaceName={false}
                                issue={issue}
                                space={space}
                            />
                        </NavLink>
                        : null
                ))}

                {/* <NavLink
                    to={SpaceRouter.Task(spaceId ?? '', 0)}
                    className={getBemClasses(styles, 'taskLink')}
                >
                    <TaskCard
                        status={TaskStatus.OnGrade}
                        className={getBemClasses(styles, 'task')}
                        showOverdueDeadline={false}
                        showSpaceName={false}
                    />
                </NavLink>
                    <NavLink
                    to={SpaceRouter.Task(spaceId ?? '', 0)}
                className={getBemClasses(styles, 'taskLink')}
            >
                <TaskCard
                    status={TaskStatus.OverdueGrade}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
            </NavLink>
            <NavLink
                to={SpaceRouter.Task(spaceId ?? '', 0)}
                className={getBemClasses(styles, 'taskLink')}
            >
                <TaskCard
                    status={TaskStatus.Done}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
            </NavLink>
            <NavLink
                to={SpaceRouter.Task(spaceId ?? '', 0)}
                className={getBemClasses(styles, 'taskLink')}
            >
                <TaskCard
                    status={TaskStatus.Done}
                    mark={100}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
            </NavLink> */}
            </FlexContainer>
        </FlexContainer>
    );
});
