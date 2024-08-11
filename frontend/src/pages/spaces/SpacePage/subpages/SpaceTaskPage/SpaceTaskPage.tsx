import { FC, useMemo, useState } from 'react';

import { SolutionGrades } from '@pages/spaces/SpacePage/subpages/SpaceSolutionPage/SolutionGrades';

import { useGetIssue } from '@entities/issue';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useIssueId } from '@shared/hooks';
import { getBemClasses, getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, NavTab, Text } from '@shared/ui';

import styles from './SpaceTaskPage.module.css';
import { TaskCriteria } from './TaskCriteria';
import { TaskDescription } from './TaskDescription';
import { TaskPreparation } from './TaskPreparation';
import { TaskSolutions } from './TaskSolutions';

enum ActiveSection {
    Description,
    Solutions,
    Criteria,
    Preparation,
    Grades
}

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTaskPage: FC<Props> = typedMemo(function SpaceTaskPage({
    className,
    'data-testid': dataTestId = 'SpaceTaskPage',
}) {
    const issueId = useIssueId();
    const { data: issue } = useGetIssue(issueId ?? '');
    const [activeSection, setActiveSection] = useState(ActiveSection.Description);

    const { isOrganizer, isStudent } = useRolesCheck();
    const { data: solution } = useGetStudentIssueSolution(issueId ?? '', {
        enabled: isStudent,
    });

    const content = useMemo(() => {
        if (!issue) {
            return null;
        }
        switch (activeSection) {
            case ActiveSection.Description:
                return <TaskDescription issue={issue} className={getBemClasses(styles, 'content')} />;
            case ActiveSection.Solutions:
                return <TaskSolutions issue={issue} className={getBemClasses(styles, 'content')} />;
            case ActiveSection.Criteria:
                return (<TaskCriteria issue={issue} criteria={[{
                    id: '0000',
                    name: '0000',
                    description: '0000',
                    minScore: 0,
                    maxScore: 100,
                    weight: 1,
                    issueId: '0000',
                }]}
                className={getBemClasses(styles, 'content')}
                />);
            case ActiveSection.Grades:
                return <SolutionGrades solutionId={solution?.id ?? ''} />;
            case ActiveSection.Preparation:
                return <TaskPreparation issue={issue} className={getBemClasses(styles, 'content')} />;
        }
        return null;
    }, [activeSection, issue]);

    if (!issue) {
        return null;
    }
    return (
        <FlexContainer
            direction="column"
            gap="l"
            alignItems="stretch"
            overflow="nowrap"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="column" className={getBemClasses(styles, 'header')}>
                <Text className={getBemClasses(styles, 'name')}>{issue.name}</Text>
                <Text className={getBemClasses(styles, 'deadline')}>
                    Сдача до: {getDateFromISO(issue.submitDeadlineDateUtc ?? '')}, {getTimeFromISO(issue?.submitDeadlineDateUtc ?? '')}
                </Text>
                <Text className={getBemClasses(styles, 'deadline')}>
                    Проверка до: {getDateFromISO(issue.assessmentDeadlineDateUtc ?? '')}, {getTimeFromISO(issue?.submitDeadlineDateUtc ?? '')}
                </Text>
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
                {isOrganizer
                    ? <NavTab
                        isActive={activeSection === ActiveSection.Solutions}
                        name="Работы"
                        onClick={() => setActiveSection(ActiveSection.Solutions)}
                    />
                    : null}
                <NavTab
                    isActive={activeSection === ActiveSection.Criteria}
                    name="Критерии"
                    onClick={() => setActiveSection(ActiveSection.Criteria)}
                />
                <NavTab
                    isActive={activeSection === ActiveSection.Preparation}
                    name="Материалы для подготовки"
                    onClick={() => setActiveSection(ActiveSection.Preparation)}
                />
                {isStudent
                    ? <NavTab
                        isActive={activeSection === ActiveSection.Grades}
                        name="Оценки"
                        onClick={() => setActiveSection(ActiveSection.Grades)}
                    />
                    : null}
            </FlexContainer>

            {content}
        </FlexContainer>
    );
});
