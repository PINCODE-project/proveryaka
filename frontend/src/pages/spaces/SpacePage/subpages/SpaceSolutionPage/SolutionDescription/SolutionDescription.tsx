import { FC } from 'react';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Input, SolutionExample, Text } from '@shared/ui';

import styles from './SolutionDescription.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SolutionDescription: FC<Props> = typedMemo(function SolutionDescription({
    className,
    'data-testid': dataTestId = 'SolutionDescription',
}) {
    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Text>
                Предварительные выводы неутешительны: высокотехнологичная концепция общественного уклада напрямую зависит от соответствующих условий активизации. Однозначно, непосредственные участники технического прогресса могут быть подвергнуты целой серии независимых исследований. С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление обеспечивает актуальность системы массового участия. А также предприниматели в сети интернет подвергнуты целой серии независимых исследований. Вот вам яркий пример современных тенденций — внедрение современных методик обеспечивает широкому кругу (специалистов) участие в формировании укрепления моральных ценностей.
            </Text>

            <FlexContainer
                direction="column"
                gap="s"
            >
                <SolutionExample
                    example={
                        []
                    }
                    antiExample={
                        []
                    }
                    triggerComponent={open =>
                        (<Button
                            variant="ghost"
                            color="primary"
                            onClick={open}
                        >
                            Примеры работ
                        </Button>)}
                />
            </FlexContainer>
        </FlexContainer>
    );
});
