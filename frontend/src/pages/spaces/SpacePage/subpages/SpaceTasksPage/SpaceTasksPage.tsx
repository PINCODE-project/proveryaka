import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { CreateIssueFullForm } from '@features/issue/create-issue/ui/CreateIssueFullForm';

import { useGetSpaceIssue } from '@entities/issue';
import { TaskCard, TaskStatus } from '@entities/space';
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

    const [status, setStatus] = useState(TaskStatus.InWork);
    const [search, setSearch] = useState('');
    const [filters, changeFilter] = useListFilters({ page: 0, count: 15 });

    const { data: issues } = useGetSpaceIssue(spaceId ?? '', filters);

    if (!issues) {
        return null;
    }
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
                        isActive={status === TaskStatus.InWork}
                        name="К выполнению"
                        onClick={() => setStatus(TaskStatus.InWork)}
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
                {(issues.entityList ?? []).map(issue => (
                    <NavLink
                        to={SpaceRouter.Task(spaceId ?? '', issue.id)}
                        className={getBemClasses(styles, 'taskLink')}
                    >
                        <TaskCard
                            status={TaskStatus.InWork}
                            className={getBemClasses(styles, 'task')}
                            showSpaceName={false}
                            issue={issue}
                            space={space}
                        />
                    </NavLink>
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
