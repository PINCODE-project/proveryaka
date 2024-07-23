import { Modal } from 'antd';
import { FC, ReactNode, useState } from 'react';

import { ExampleResponse } from '@entities/example/common';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer } from '@shared/ui';
import { SolutionCarousel } from '@shared/ui/SolutionExample/SolutionCarousel';

import styles from './SolutionExample.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    example: ExampleResponse[];
    antiExample: ExampleResponse[];
    triggerComponent: (open: () => void) => ReactNode;
}>;

export const SolutionExample: FC<Props> = typedMemo(function SolutionExample({
    example,
    antiExample,
    className,
    triggerComponent,
    'data-testid': dataTestId = 'SolutionExample',
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {triggerComponent(() => setIsOpen(true))}
            <Modal
                open={isOpen}
                footer={false}
                data-testid={dataTestId}
                onCancel={() => setIsOpen(false)}
            >
                <div className={getBemClasses(styles, null, null, className)}>
                    <SolutionCarousel solutions={example} />
                    <SolutionCarousel solutions={antiExample} />
                </div>
            </Modal>
        </>
    );
});
