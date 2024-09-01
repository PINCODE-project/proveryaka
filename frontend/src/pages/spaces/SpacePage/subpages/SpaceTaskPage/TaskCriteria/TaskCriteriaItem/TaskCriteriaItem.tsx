import { Collapse } from 'antd';
import { FC, useMemo } from 'react';

import { GetCriteriaResponse } from '@entities/criteria';
import { ExampleType } from '@entities/example/common';
import { useGetCriteriaExamples } from '@entities/example/criteria-example';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, SolutionExample, Text } from '@shared/ui';

import styles from './TaskCriteriaItem.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: GetCriteriaResponse;
}>;

export const TaskCriteriaItem: FC<Props> = typedMemo(function TaskCriteriaItem({
    criteria,
}) {
    const { data: examples } = useGetCriteriaExamples(criteria.id);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.AntiExample) ?? [], [examples]);

    return (
        <Collapse
            className={getBemClasses(styles)}
            items={[{
                key: '1',
                label: <FlexContainer direction="row" gap="m" justifyContent="space-between"
                    overflow="nowrap"
                >
                    <Text className={getBemClasses(styles, 'name')}>{criteria.name}</Text>

                    <FlexContainer direction="row" gap="xs" alignItems="center">
                        <Text className={getBemClasses(styles, 'params')}>
                            Шкала оценки: {criteria.minScore} - {criteria.maxScore}
                        </Text>
                    </FlexContainer>
                </FlexContainer>,
                children: <FlexContainer direction="column" gap="m">
                    <FlexContainer direction="column">
                        <Text className={getBemClasses(styles, 'subtitle')}>
                            Вес
                        </Text>
                        <Text className={getBemClasses(styles, 'description')}>
                            {criteria.weight}
                        </Text>
                    </FlexContainer>

                    <FlexContainer direction="column">
                        <Text className={getBemClasses(styles, 'subtitle')}>
                            Описание
                        </Text>
                        <Text className={getBemClasses(styles, 'description')}>
                            {criteria.description}
                        </Text>
                    </FlexContainer>

                    <SolutionExample
                        example={standardExamples}
                        antiExample={antiExamples}
                        triggerComponent={open => (
                            <Button onClick={open}>
                            Пример выполнения
                            </Button>
                        )}
                    />
                </FlexContainer>,
            }]}
        />
    );
});
