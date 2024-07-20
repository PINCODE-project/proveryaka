import { FC } from 'react';

import { SolutionCard } from '@entities/solution';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';

import styles from './TaskSolutions.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const TaskSolutions: FC<Props> = typedMemo(function TaskSolutions({
    className,
    'data-testid': dataTestId = 'TaskSolutions',
}) {
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <SolutionCard />
            <SolutionCard />
            <SolutionCard />
        </FlexContainer>
    );
});
