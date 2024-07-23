import { FC, useState } from 'react';

import { ExampleResponse } from '@entities/example/common';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './SolutionCarousel.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    solutions: ExampleResponse[];
}>;

export const SolutionCarousel: FC<Props> = typedMemo(function SolutionCarousel({
    className,
    solutions,
    'data-testid': dataTestId = 'SolutionCarousel',
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <FlexContainer
            direction="column"
            gap="m"
        >
            <FlexContainer direction="row" gap="xs">
                {solutions.map((_, index) => (
                    <button
                        onClick={() => setCurrentIndex(index)}
                        className={getBemClasses(styles, 'indexButton', { isActive: index === currentIndex })}
                    >
                        {index + 1}
                    </button>
                ))}
            </FlexContainer>

            {solutions.length > 0 &&
                <div className={getBemClasses(styles, 'solutionScroll')}>
                    <Text>
                        {solutions[currentIndex].exampleLink ?? ''}
                    </Text>
                    <Text>
                        {solutions[currentIndex].description ?? ''}
                    </Text>
                </div>}
        </FlexContainer>
    );
});
