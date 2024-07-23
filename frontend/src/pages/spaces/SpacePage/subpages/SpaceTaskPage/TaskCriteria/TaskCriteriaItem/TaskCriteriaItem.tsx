import { FC, useMemo } from 'react';

import { GetCriteriaResponse } from '@entities/criteria';
import { ExampleType } from '@entities/example/common';
import { useGetCriteriaExamples } from '@entities/example/criteria-example';

import { useListFilters } from '@shared/hooks';
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
    const [filters] = useListFilters({ count: 15, page: 0 });

    const { data: examples } = useGetCriteriaExamples(criteria.id, filters);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType == ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType == ExampleType.AntiExample) ?? [], [examples]);

    return (
        <FlexContainer direction="column" key={criteria.id}>
            <Text>{criteria.name}</Text>
            <Text>Вес: {criteria.weight}</Text>
            <Text>Шкала оценивания: {criteria.minScore} - {criteria.maxScore}</Text>
            <Text>{criteria.description}</Text>
            <SolutionExample
                example={standardExamples}
                antiExample={antiExamples}
                triggerComponent={open => (
                    <Button variant="ghost" onClick={open}>
                        Пример выполнения
                    </Button>
                )}
            />
        </FlexContainer>
    );
});
