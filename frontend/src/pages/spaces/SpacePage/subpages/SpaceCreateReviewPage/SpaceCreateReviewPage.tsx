import { FC, useMemo, useState } from 'react';

import { SolutionReview } from '@pages/spaces/SpacePage/subpages/SpaceSolutionPage/SolutionReview';

import { useGetIssueCriteria } from '@entities/criteria/lib/useGetIssueCriteria';
import { useGetIssue } from '@entities/issue';
import { useGetExpertSolution } from '@entities/solution/lib/useGetExpertSolution';
import { useGetSolution } from '@entities/solution/lib/useGetSolution';
import { useGetSpaceExperts } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useListFilters } from '@shared/hooks';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { getBemClasses, getDateFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, NavTab, Text } from '@shared/ui';

import { SolutionAssignment } from './SolutionAssignment';
import { SolutionCriteria } from './SolutionCriteria';
import { SolutionDescription } from './SolutionDescription';
import { SolutionGrades } from './SolutionGrades';
import styles from './SpaceSolutionPage.module.css';

enum ActiveSection {
    Description,
    Assignments,
    Criteria,
    Grades,
    Review
}

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionPage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpaceSolutionPage',
}) {
    const solutionId = useSolutionId();

    const { data: solution } = useGetExpertSolution(solutionId!);
    const { data: issue } = useGetIssue(solution!.issueId, {
        enabled: Boolean(solution?.issueId),
    });
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
            case ActiveSection.Review:
                return <SolutionReview />;
            case ActiveSection.Criteria:
                return (<SolutionCriteria criteria={issueCriteria?.entityList ?? []}
                />);
            case ActiveSection.Grades:
                return <SolutionGrades grades={[]} />;
        }
        return null;
    }, [activeSection]);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="column" gap="xs">
                <Text>{issue?.name}</Text>
                <Text>Сдать до: {getDateFromISO(issue?.submitDeadlineDateUtc ?? '')}</Text>
                <Text>Оценить до: {getDateFromISO(issue?.assessmentDeadlineDateUtc ?? '')}</Text>
            </FlexContainer>

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
                <NavTab
                    isActive={activeSection === ActiveSection.Review}
                    name="Оценить"
                    onClick={() => setActiveSection(ActiveSection.Review)}
                />
            </FlexContainer>

            {content}
        </FlexContainer>
    );
});
