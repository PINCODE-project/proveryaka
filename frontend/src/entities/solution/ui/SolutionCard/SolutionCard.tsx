import { FC, useMemo } from 'react';

import { GetIssueResponse } from '@entities/issue';
import { IssueStatus } from '@entities/issue/model/IssueStatus';
import { useHasCurrentUserMark } from '@entities/solution/lib/useHasCurrentUserMark';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';
import { SolutionStatus } from '@entities/solution/model/SolutionStatus';
import { useGetCurrentUserInfo } from '@entities/user';

import Checkmark from '@shared/assets/icons/Checkmark.svg';
import SubtractCircle from '@shared/assets/icons/SubtractCircle.svg';
import { getBemClasses, getDateFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Image, SettingsDropdown, Text } from '@shared/ui';

import styles from './SolutionCard.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    solution: GetSolutionForExpert;
    issue?: GetIssueResponse;

    mark?: number;
    showAvatar?: boolean;
    showSpaceName?: boolean;
    showAssignmentDeadline?: boolean;
    showOverdueDeadline?: boolean;
    showGradingDeadline?: boolean;
    showGradingCount?: boolean;
    showActions?: boolean;
}>;

export const SolutionCard: FC<Props> = typedMemo(function SolutionCard({
    className,
    solution,
    issue,
    showAvatar = true,
    showSpaceName = true,
    showAssignmentDeadline = true,
    showOverdueDeadline = true,
    showGradingDeadline = true,
    showGradingCount = true,
    showActions = true,
    mark,
    'data-testid': dataTestId = 'TaskCard',
}) {
    const { data: user } = useGetCurrentUserInfo();
    const markReview = undefined;/* useHasCurrentUserMark(solution.id, user?.id ?? ''); */

    const statusComponent = useMemo(() => {
        if (markReview) {
            <>
                <Checkmark className={getBemClasses(styles, 'statusIcon')} />
                <Text className={getBemClasses(styles, 'statusText')}>Завершено</Text>
            </>;
        }
        switch (solution.status) {
            case SolutionStatus.InGrade:
                return (
                    <Text className={getBemClasses(styles, 'statusText')}>
                        На проверке
                    </Text>
                );
            case SolutionStatus.OverdueGrade:
                return (
                    <>
                        <SubtractCircle className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Не проверено</Text>
                    </>
                );
            case SolutionStatus.Done:
                return (
                    <>
                        <Checkmark className={getBemClasses(styles, 'statusIcon')} />
                        <Text className={getBemClasses(styles, 'statusText')}>Завершено</Text>
                    </>
                );
        }
    }, [solution.status]);

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
                        {solution.issueName}
                    </Text>
                </FlexContainer>
                {(showGradingDeadline || (issue && showAssignmentDeadline))
                    ? <FlexContainer
                        direction="column"
                        overflow="nowrap"
                        gap="xxs"
                    >
                        {showAssignmentDeadline
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Сдача: {getDateFromISO(solution?.submitAtUtc ?? '')}
                            </Text>
                            : null}
                        {showGradingDeadline
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Оценка: {getDateFromISO(solution?.assessmentDeadlineDateUtc ?? '')}
                            </Text>
                            : null}
                    </FlexContainer>
                    : null}
                {(showGradingCount)
                    ? <FlexContainer
                        direction="column"
                        overflow="nowrap"
                        gap="xxs"
                    >
                        {showGradingCount
                            ? <Text className={getBemClasses(styles, 'deadline')}>
                                Оценок: {solution.reviewCount}/{solution.checksCountMax}
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
                                    label: 'Назначить проверку',
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
                    className={getBemClasses(styles, 'status', { status: markReview ? SolutionStatus.Done : solution.status })}
                >
                    {statusComponent}
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
});
