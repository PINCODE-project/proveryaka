import { FC, useMemo } from 'react';

import { TaskStatus } from '@entities/space';

import Checkmark from '@shared/assets/icons/Checkmark.svg';
import Settings from '@shared/assets/icons/Settings.svg';
import SubtractCircle from '@shared/assets/icons/SubtractCircle.svg';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, SettingsDropdown, Text } from '@shared/ui';

import styles from './TaskCard.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    status: TaskStatus;
    mark?: number;

    showAvatar?: boolean;
    showSpaceName?: boolean;
    showAssignmentDeadline?: boolean;
    showOverdueDeadline?: boolean;
    showGradingDeadline?: boolean;
    showAssignmentCount?: boolean;
    showGradingCount?: boolean;
    showActions?: boolean;
}>;

export const TaskCard: FC<Props> = typedMemo(function TaskCard({
    className,
    showAvatar = true,
    showSpaceName = true,
    showAssignmentDeadline = true,
    showOverdueDeadline = true,
    showGradingDeadline = true,
    showGradingCount = true,
    showAssignmentCount = true,
    showActions = true,
    status,
    mark,
    'data-testid': dataTestId = 'TaskCard',
}) {
    const statusComponent = useMemo(() => {
        switch (status) {
            case TaskStatus.InWork:
                return (
                    <Text className={getBemClasses(styles, 'statusText')}>
                        Сдать до: 00.00.00
                    </Text>
                );
            case TaskStatus.OnGrade:
                return (
                    <Text className={getBemClasses(styles, 'statusText')}>
                        Оценить до: 00.00.00
                    </Text>
                );
            case TaskStatus.OverdueGrade:
                return (
                    <>
                        <SubtractCircle className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Не сдано</Text>
                    </>
                );
            case TaskStatus.Done:
                return (
                    mark !== undefined
                        ? <Text className={getBemClasses(styles, 'statusText')}>
                            Количество баллов: 100/100
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
                {showAvatar
                    ? <Image
                        className={getBemClasses(styles, 'avatar')}
                        alt="space avatar"
                        placeholderSrc="https://masterpiecer-images.s3.yandex.net/4b4e8fbd579411ee8d01e6d39d9a42a4:upscaled"
                    />
                    : null}
                <FlexContainer
                    direction="column"
                    overflow="nowrap"
                    gap="xxs"
                >
                    <Text className={getBemClasses(styles, 'name')}>
                        Name
                    </Text>
                    {showOverdueDeadline
                        ? <Text className={getBemClasses(styles, 'deadline', { isError: true })}>
                            Срок: Overdue deadline
                        </Text>
                        : null}
                    {showSpaceName
                        ? <Text className={getBemClasses(styles, 'spaceName')}>
                            Space Name
                        </Text>
                        : null}
                </FlexContainer>
                {(showGradingDeadline || showAssignmentDeadline)
                    ? <FlexContainer
                        direction="column"
                        overflow="nowrap"
                        gap="xxs"
                    >
                        {showAssignmentDeadline
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Assignment deadline
                            </Text>
                            : null}
                        {showGradingDeadline
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Grading deadline
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
                                Сдано: 5/5 работ
                            </Text>
                            : null}
                        {showGradingCount
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Проверено: 2/5 работ
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
