import { FC, useMemo } from 'react';

import { GetIssueResponse } from '@entities/issue';
import { SpaceSettings, TaskStatus } from '@entities/space';
import { GetSpaceResponse } from '@entities/space/model/GetSpaceResponse';

import Checkmark from '@shared/assets/icons/Checkmark.svg';
import Settings from '@shared/assets/icons/Settings.svg';
import SubtractCircle from '@shared/assets/icons/SubtractCircle.svg';
import { getBemClasses, getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, SettingsDropdown, Text } from '@shared/ui';

import styles from './TaskCard.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: TaskStatus;
    issue: GetIssueResponse;
    space?: SpaceSettings;

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

    showAvatar = true,
    showSpaceName = true,
    showAssignmentDeadline = true,
    showGradingDeadline = true,
    showGradingCount = true,
    showAssignmentCount = true,
    showActions = true,
    status,
    'data-testid': dataTestId = 'TaskCard',
}) {
    const statusComponent = useMemo(() => {
        switch (status) {
            case TaskStatus.InWork:
                return issue.assessmentDeadlineDateUtc
                    ? (
                        <Text className={getBemClasses(styles, 'statusText')}>
                            Выполняется
                        </Text>
                    )
                    : null;
            case TaskStatus.OnGrade:
                return issue.submitDeadlineDateUtc
                    ? (
                        <Text className={getBemClasses(styles, 'statusText')}>
                            На проверке
                        </Text>
                    )
                    : null;
            case TaskStatus.OverdueGrade:
                return (
                    <>
                        <SubtractCircle className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Не сдано</Text>
                    </>
                );
            case TaskStatus.Done:
                return (
                    undefined !== false
                        ? <Text className={getBemClasses(styles, 'statusText')}>
                            100/100
                        </Text>
                        : <>
                            <Checkmark className={getBemClasses(styles, 'statusIcon')} />
                            <Text className={getBemClasses(styles, 'statusText')}>Сдано</Text>
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
                        {showAssignmentDeadline && issue.assessmentDeadlineDateUtc
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Сдача: {getDateFromISO(issue.assessmentDeadlineDateUtc)}, {getTimeFromISO(issue.assessmentDeadlineDateUtc)}
                            </Text>
                            : null}
                        {showGradingDeadline && issue.submitDeadlineDateUtc
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Проверка: {getDateFromISO(issue.submitDeadlineDateUtc)}, {getTimeFromISO(issue.submitDeadlineDateUtc)}
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
                                Сдано: 100500/100500 работ
                            </Text>
                            : null}
                        {showGradingCount
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Проверено: 100500/100500 работ
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
                                    label: 'Настройки',
                                    icon: <Settings className={getBemClasses(styles, 'settingsActionButtonIcon')} />,
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
