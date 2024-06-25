import { FC, useState } from 'react';

import { TaskCard, TaskStatus } from '@entities/space';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, NavTab } from '@shared/ui';

import styles from './SpaceTasksPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTasksPage: FC<Props> = typedMemo(function SpaceTasksPage({
    className,
    'data-testid': dataTestId = 'SpaceTasksPage',
}) {
    const [status, setStatus] = useState(TaskStatus.InWork);
    const [search, setSearch] = useState('');

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
                        name="Предстоящие"
                        onClick={() => setStatus(TaskStatus.InWork)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.Overdue}
                        name="Просроченные"
                        onClick={() => setStatus(TaskStatus.Overdue)}
                    />
                    <NavTab
                        isActive={status === TaskStatus.Done}
                        name="Выполненные"
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
                <TaskCard
                    status={TaskStatus.InWork}
                    className={getBemClasses(styles, 'task')}
                    showSpaceName={false}
                />
                <TaskCard
                    status={TaskStatus.Overdue}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
                <TaskCard
                    status={TaskStatus.Done}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
                <TaskCard
                    status={TaskStatus.Done}
                    mark={100}
                    className={getBemClasses(styles, 'task')}
                    showOverdueDeadline={false}
                    showSpaceName={false}
                />
            </FlexContainer>

        </FlexContainer>
    );
});
