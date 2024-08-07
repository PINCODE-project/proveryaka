import { FC, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { CreateIssueFullForm } from '@features/issue/create-issue/ui/CreateIssueFullForm';

import { GetIssueResponse, useGetSpaceIssue } from '@entities/issue';
import { getIssueStatus } from '@entities/issue/lib/getIssueStatus';
import { IssueStatus } from '@entities/issue/model/IssueStatus';
import { getStudentIssueSolution } from '@entities/solution/api/getStudentIssueSolution';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { TaskCard } from '@entities/space';
import { useGetSpace } from '@entities/space/lib/useGetSpace';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

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
    const [filters, changeFilter] = useListFilters();

    const { isOrganizer, isStudent } = useRolesCheck();

    const { data: rawIssues } = useGetSpaceIssue(spaceId ?? '', filters);
    const [issues, setIssues] = useState<GetIssueResponse[]>([]);

    useEffect(() => {
        (async () => {
            if (!rawIssues || !rawIssues.entityList) {
                return;
            }
            const issues = await Promise.all(rawIssues!.entityList!.map(async issue => {
                const solution = isStudent ? await getStudentIssueSolution(issue.id) : false;

                return ({
                    ...issue,
                    innerStatus: getIssueStatus(issue, Boolean(solution), isStudent),
                });
            }));
            setIssues(issues);
        })();
    }, [rawIssues]);

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
                        isActive={status === IssueStatus.InWork}
                        name="Открыта сдача"
                        onClick={() => setStatus(IssueStatus.InWork)}
                    />
                    {isStudent
                        ? <NavTab
                            isActive={status === IssueStatus.OverdueWork}
                            name="Просрочена сдача"
                            onClick={() => setStatus(IssueStatus.OverdueWork)}
                        />
                        : null}
                    <NavTab
                        isActive={status === IssueStatus.InGrade}
                        name="На проверке"
                        onClick={() => setStatus(IssueStatus.InGrade)}
                    />
                    {isOrganizer
                        ? <NavTab
                            isActive={status === IssueStatus.OverdueGrade}
                            name="Просрочена проверка"
                            onClick={() => setStatus(IssueStatus.OverdueGrade)}
                        />
                        : null}
                    <NavTab
                        isActive={status === IssueStatus.Done}
                        name="Проверено"
                        onClick={() => setStatus(IssueStatus.Done)}
                    />
                </FlexContainer>

                {isOrganizer
                    ? <CreateIssueFullForm
                        triggerElement={open => (
                            <Button onClick={open}>
                                Создать задание
                            </Button>
                        )}
                        spaceId={spaceId ?? ''}
                    />
                    : null}

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
                {issues.map(issue => (
                    issue.innerStatus === status
                        ? <NavLink
                            to={SpaceRouter.Task(spaceId ?? '', issue.id)}
                            className={getBemClasses(styles, 'taskLink')}
                        >
                            <TaskCard
                                showActions={isOrganizer}
                                className={getBemClasses(styles, 'task')}
                                showSpaceName={false}
                                showAvatar={false}
                                showAssignmentCount={isOrganizer}
                                showGradingCount={isOrganizer}
                                status={issue.innerStatus}
                                issue={issue}
                                space={space}
                            />
                        </NavLink>
                        : null
                ))}
            </FlexContainer>
        </FlexContainer>
    );
});
