import { FC, useMemo, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
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
    Preparation
}

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTaskPage: FC<Props> = typedMemo(function SpaceTaskPage({
    className,
    'data-testid': dataTestId = 'SpaceTaskPage',
}) {
    const [activeSection, setActiveSection] = useState(ActiveSection.Description);

    const content = useMemo(() => {
        switch (activeSection) {
            case ActiveSection.Description:
                return <TaskDescription />;
            case ActiveSection.Solutions:
                return <TaskSolutions />;
            case ActiveSection.Criteria:
                return (<TaskCriteria criteria={[{
                    id: '0000',
                    name: '0000',
                    description: '0000',
                    minScore: 0,
                    maxScore: 100,
                    weight: 1,
                    issueId: '0000',
                }]}
                />);
            case ActiveSection.Preparation:
                return <TaskPreparation />;
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
                    isActive={activeSection === ActiveSection.Solutions}
                    name="Работы"
                    onClick={() => setActiveSection(ActiveSection.Solutions)}
                />
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
            </FlexContainer>

            {content}
        </FlexContainer>
    );
});
