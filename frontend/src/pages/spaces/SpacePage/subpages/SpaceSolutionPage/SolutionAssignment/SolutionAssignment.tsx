import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, Text } from '@shared/ui';

import styles from './SolutionAssignment.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SolutionAssignment: FC<Props> = typedMemo(function SolutionAssignment({
    className,
    'data-testid': dataTestId = 'SolutionAssignment',
}) {
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="column"
                gap="s"
            >
                <Text>Форма сдачи</Text>
                <Input value="Текст" disabled />
            </FlexContainer>
        </FlexContainer>
    );
});
