import { FC, useMemo } from 'react';

import { EditIssueForm } from '@features/issue/edit-issue';
import { StartDistributionForm } from '@features/issue/start-distribution/ui/StartDistributionForm';

import { GetIssueResponse } from '@entities/issue';
import { IssueStatus } from '@entities/issue/model/IssueStatus';
import { SpaceSettings } from '@entities/space';

import Checkmark from '@shared/assets/icons/Checkmark.svg';
import SubtractCircle from '@shared/assets/icons/SubtractCircle.svg';
import { getBemClasses, getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, SettingsDropdown, Text } from '@shared/ui';

import styles from './TaskCard.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    issue: GetIssueResponse;
    space?: SpaceSettings;
    status: IssueStatus;

    showAvatar?: boolean;
    showSpaceName?: boolean;
    showAssignmentDeadline?: boolean;
    showGradingDeadline?: boolean;
    showAssignmentCount?: boolean;
    showGradingCount?: boolean;
    showActions?: boolean;
}>;

export const TaskCard: FC<Props> = typedMemo(function TaskCard({
    className,
    issue,
    space,
    status,

    showAvatar = true,
    showSpaceName = true,
    showAssignmentDeadline = true,
    showGradingDeadline = true,
    showGradingCount = true,
    showAssignmentCount = true,
    showActions = true,
    'data-testid': dataTestId = 'TaskCard',
}) {
    const statusComponent = useMemo(() => {
        switch (status) {
            case IssueStatus.InWork:
                return (
                    <Text className={getBemClasses(styles, 'statusText')}>
                            Выполняется
                    </Text>
                );
            case IssueStatus.InGrade:
                return (
                    <Text className={getBemClasses(styles, 'statusText')}>
                            На проверке
                    </Text>
                );
            case IssueStatus.OverdueGrade:
                return (
                    <>
                        <SubtractCircle className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Не проверено</Text>
                    </>
                );
            case IssueStatus.Done:
                return (
                    <>
                        <Checkmark className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Завершено</Text>
                    </>
                );
        }
    }, [status]);

    return (
        <FlexContainer
            direction="row"
            alignItems="start"
            gap="m"
            justifyContent="space-between"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="row"
                gap="m"
                alignItems="start"
            >
                {showAvatar && space
                    ? <Image
                        className={getBemClasses(styles, 'avatar')}
                        alt="space avatar"
                        src={space.icon}
                        placeholderSrc="https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled"
                    />
                    : null}
                <FlexContainer
                    direction="column"
                    overflow="nowrap"
                    gap="xxs"
                >
                    <Text className={getBemClasses(styles, 'name')}>
                        {issue.name}
                    </Text>
                    {showSpaceName && space
                        ? <Text className={getBemClasses(styles, 'spaceName')}>
                            {space.name}
                        </Text>
                        : null}
                </FlexContainer>
                {(showGradingDeadline || showAssignmentDeadline)
                    ? <FlexContainer
                        direction="column"
                        overflow="nowrap"
                        gap="xxs"
                    >
                        {showAssignmentDeadline && issue.submitDeadlineDateUtc
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Дедлайн сдачи: {getDateFromISO(issue.submitDeadlineDateUtc)}, {getTimeFromISO(issue.submitDeadlineDateUtc)}
                            </Text>
                            : null}
                        {showGradingDeadline && issue.assessmentDeadlineDateUtc
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Дедлайн проверки: {getDateFromISO(issue.assessmentDeadlineDateUtc)}, {getTimeFromISO(issue.assessmentDeadlineDateUtc)}
                            </Text>
                            : null}
                    </FlexContainer>
                    : null}
                {(showGradingCount || showAssignmentCount)
                    ? <FlexContainer
                        direction="column"
                        overflow="nowrap"
                        gap="xxs"
                    >
                        {showAssignmentCount
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Сдано: {issue.allSolutionCount}/{issue.allTeamCountInSpace} работ
                            </Text>
                            : null}
                        {showGradingCount
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Проверено: {issue.reviewedSolutionCount}/{issue.allSolutionCount} работ
                            </Text>
                            : null}
                    </FlexContainer>
                    : null}
            </FlexContainer>
            <FlexContainer
                direction="column"
                gap="xs"
                alignItems="end"
            >
                {showActions
                    ? <SettingsDropdown
                        menu={{
                            items: [
                                {
                                    key: 0,
                                    label: <EditIssueForm
                                        spaceId={space?.id ?? ''}
                                        triggerElement={open => <Text onClick={open}>Настройки</Text>}
                                        issue={issue}
                                    />,
                                },
                                {
                                    key: 1,
                                    label: <StartDistributionForm
                                        spaceId={space?.id ?? ''}
                                        triggerElement={open => <Text onClick={open}>Назначить</Text>}
                                        issueId={issue.id}
                                    />,
                                },
                            ],
                        }}
                    />
                    : null}
                <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    gap="xxs"
                    alignItems="center"
                    className={getBemClasses(styles, 'status', { status })}
                >
                    {statusComponent}
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
});
