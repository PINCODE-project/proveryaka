import { FC, useMemo, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
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
    Grades
}

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionPage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpaceSolutionPage',
}) {
    const [activeSection, setActiveSection] = useState(ActiveSection.Description);

    const content = useMemo(() => {
        switch (activeSection) {
            case ActiveSection.Description:
                return <SolutionDescription />;
            case ActiveSection.Assignments:
                return <SolutionAssignment />;
            case ActiveSection.Criteria:
                return (<SolutionCriteria criteria={[{
                    id: '0000',
                    name: '0000',
                    description: '0000',
                    minScore: 0,
                    maxScore: 100,
                    weight: 1,
                    issueId: '0000',
                }]}
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
                <Text>Задание 0. Мок</Text>
                <Text>Сдать до: 00.00.0000</Text>
                <Text>Оценить до: 00.00.0000</Text>
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
            </FlexContainer>

            {content}
        </FlexContainer>
    );
});
