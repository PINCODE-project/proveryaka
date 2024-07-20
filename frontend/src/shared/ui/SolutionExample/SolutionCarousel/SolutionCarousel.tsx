import { FC, useState } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Text } from '@shared/ui';

import styles from './SolutionCarousel.module.css';
import { Solution } from '../SolutionExample';

export type Props = ClassNameProps & TestProps & Readonly<{
    solutions: Solution[];
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

            <div className={getBemClasses(styles, 'solutionScroll')}>
                <Text>
                    {solutions[currentIndex].text ?? ''}
                </Text>
                <Text>
                    {solutions[currentIndex].description ?? ''}
                </Text>
            </div>
        </FlexContainer>
    );
});
