import { FC, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, NavTab } from '@shared/ui';

import styles from './SolutionGrades.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    grades: any[];
}>;

export const SolutionGrades: FC<Props> = typedMemo(function SolutionGrades({
    className,
    grades,
    'data-testid': dataTestId = 'SolutionGrades',
}) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="row"
                overflow="nowrap"
                alignItems="center"
                gap="l"
            >
                <NavTab
                    isActive={currentIndex === null}
                    name="Общее"
                    onClick={() => setCurrentIndex(null)}
                />
                {
                    grades.map((_, index) => (
                        <NavTab
                            key={index}
                            isActive={currentIndex === index}
                            name={`Оценка ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))
                }

            </FlexContainer>
        </FlexContainer>
    );
});
