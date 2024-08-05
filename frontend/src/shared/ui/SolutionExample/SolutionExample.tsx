import { Modal, Typography } from 'antd';
import { FC, ReactNode, useState } from 'react';

import { ExampleResponse } from '@entities/example/common';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';
import { SolutionCarousel } from '@shared/ui/SolutionExample/SolutionCarousel';

import styles from './SolutionExample.module.css';

export type Props<TExample extends ExampleResponse> = ClassNameProps & TestProps & Readonly<{
    example: TExample[];
    antiExample: TExample[];
    triggerComponent: (open: () => void) => ReactNode;
}>;

export const SolutionExample = typedMemo(function SolutionExample<TExample extends ExampleResponse>({
    example,
    antiExample,
    className,
    triggerComponent,
    'data-testid': dataTestId = 'SolutionExample',
}: Props<TExample>) {
    const [isOpen, setIsOpen] = useState(false);

    if (example.length === 0 && antiExample.length === 0) {
        return null;
    }
    return (
        <>
            {triggerComponent(() => setIsOpen(true))}
            <Modal
                className={getBemClasses(styles, 'modal')}
                open={isOpen}
                footer={false}
                data-testid={dataTestId}
                onCancel={() => setIsOpen(false)}
            >
                <div className={getBemClasses(styles, null, { isOneColumn: example.length === 0 || antiExample.length === 0 }, className)}>
                    {example.length > 0 && <FlexContainer direction="column" className={getBemClasses(styles, 'column')}>
                        <Typography className={getBemClasses(styles, 'header')}>Эталоны</Typography>
                        <SolutionCarousel solutions={example} />
                    </FlexContainer>}

                    {antiExample.length > 0 && <FlexContainer direction="column" className={getBemClasses(styles, 'column')}>
                        <Typography className={getBemClasses(styles, 'header')}>Антипримеры</Typography>
                        <SolutionCarousel solutions={antiExample} />
                    </FlexContainer>}
                </div>
            </Modal>
        </>
    );
});
