import { FC } from 'react';

import { GetCriteriaResponse } from '@entities/criteria';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, SolutionExample, Text } from '@shared/ui';

import styles from './TaskCriteria.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: GetCriteriaResponse[];
}>;

export const TaskCriteria: FC<Props> = typedMemo(function TaskCriteria({
    className,
    criteria,
    'data-testid': dataTestId = 'TaskCriteria',
}) {
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            {
                criteria.map(item => (
                    <FlexContainer direction="column" key={item.id}>
                        <Text>{item.name}</Text>
                        <Text>Вес: {item.weight}</Text>
                        <Text>Шкала оценивания: {item.minScore} - {item.maxScore}</Text>
                        <Text>{item.description}</Text>
                        <SolutionExample
                            example={[{ text: 'text', description: 'desc' }]}
                            antiExample={[{ text: 'text', description: 'desc' }]}
                            triggerComponent={open => (
                                <Button variant="ghost" onClick={open}>
                                    Пример выполнения
                                </Button>
                            )}
                        />
                    </FlexContainer>
                ))
            }
        </FlexContainer>
    );
});
