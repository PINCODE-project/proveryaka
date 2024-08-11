import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';
import { SpaceEngineeringWorksPage } from '@pages/spaces/SpacePage/subpages/SpaceEngineeringWorksPage';

import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { useGetIssue } from '@entities/issue';
import { useCanReviewSolution } from '@entities/solution/lib/useCanReviewSolution';
import { useGetExpertSolution } from '@entities/solution/lib/useGetExpertSolution';
import { useGetOrganizerSolution } from '@entities/solution/lib/useGetOrganizerSolution';
import { useHasCurrentUserMark } from '@entities/solution/lib/useHasCurrentUserMark';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { useGetCurrentUserInfo } from '@entities/user';

import { useIssueId, useListFilters } from '@shared/hooks';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, NavTab, Text } from '@shared/ui';

import { SolutionAssignment } from './SolutionAssignment';
import { SolutionCriteria } from './SolutionCriteria';
import { SolutionDescription } from './SolutionDescription';
import { SolutionGrades } from './SolutionGrades';
import styles from './SpaceSolutionPage.module.css';

enum ActiveSection {
    Description,
    Assignments,
    Criteria,
    Grades
}

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionPage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpaceSolutionPage',
}) {
    const { isOrganizer, isStudent } = useRolesCheck();
    const spaceId = useSpaceId();
    const issueId = useIssueId();
    const solutionId = useSolutionId();

    const { data: expertSolution } = useGetExpertSolution(solutionId!, {
        enabled: !isOrganizer,
    });
    const { data: organizerSolution } = useGetOrganizerSolution(solutionId!, {
        enabled: isOrganizer,
    });
    const solution = useMemo(() => isOrganizer
        ? organizerSolution
        : expertSolution, [isOrganizer, organizerSolution, expertSolution]);

    const { data: issue } = useGetIssue(issueId!);
    const [criteriaFilters] = useListFilters();
    const { data: issueCriteria } = useGetIssueCriteria(solution!.issueId, criteriaFilters, {
        enabled: Boolean(solution?.issueId),
    });
    const [activeSection, setActiveSection] = useState(ActiveSection.Description);
    const content = useMemo(() => {
        switch (activeSection) {
            case ActiveSection.Description:
                return <SolutionDescription />;
            case ActiveSection.Assignments:
                return <SolutionAssignment />;
            case ActiveSection.Criteria:
                return (<SolutionCriteria criteria={issueCriteria?.entityList ?? []}
                />);
            case ActiveSection.Grades:
                return <SolutionGrades solutionId={solutionId ?? ''} />;
        }
        return null;
    }, [activeSection]);

    const { data: user } = useGetCurrentUserInfo();
    const canReview = useCanReviewSolution(solutionId ?? '', spaceId ?? '');
    const hasReview = useHasCurrentUserMark(solutionId ?? '', user?.id ?? '');

    return (
        <FlexContainer
            direction="column"
            gap="m"
            alignItems="stretch"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="column" className={getBemClasses(styles, 'header')}>
                <Text className={getBemClasses(styles, 'name')}>{issue?.name}</Text>
                <Text className={getBemClasses(styles, 'deadline')}>
                    Сдать до: {getDateFromISO(issue?.submitDeadlineDateUtc ?? '')}, {getTimeFromISO(issue?.submitDeadlineDateUtc ?? '')}
                </Text>
                <Text className={getBemClasses(styles, 'deadline')}>
                    Оценить до: {getDateFromISO(issue?.assessmentDeadlineDateUtc ?? '')}, {getTimeFromISO(issue?.assessmentDeadlineDateUtc ?? '')}
                </Text>
            </FlexContainer>

            <FlexContainer
                direction="row"
                gap="l"
                alignItems="center"
                justifyContent="space-between"
                className={getBemClasses(styles, 'navPanel')}
            >
                <FlexContainer
                    direction="row"
                    overflow="nowrap"
                    alignItems="center"
                    gap="l"
                >
                    <NavTab
                        isActive={activeSection === ActiveSection.Description}
                        name="Описание"
                        onClick={() => setActiveSection(ActiveSection.Description)}
                    />
                    <NavTab
                        isActive={activeSection === ActiveSection.Assignments}
                        name="Работа"
                        onClick={() => setActiveSection(ActiveSection.Assignments)}
                    />
                    <NavTab
                        isActive={activeSection === ActiveSection.Criteria}
                        name="Критерии"
                        onClick={() => setActiveSection(ActiveSection.Criteria)}
                    />
                    <NavTab
                        isActive={activeSection === ActiveSection.Grades}
                        name="Оценки"
                        onClick={() => setActiveSection(ActiveSection.Grades)}
                    />
                </FlexContainer>
                {canReview && hasReview === undefined && new Date() < new Date(solution?.assessmentDeadlineDateUtc ?? '')
                    ? <NavLink to={SpaceRouter.EstimateTaskWork(spaceId ?? '', issueId ?? '', solutionId ?? '')}>
                        <Button>
                        Оценить работу
                        </Button>
                    </NavLink>
                    : null}
            </FlexContainer>

            {content}
        </FlexContainer>
    );
});
