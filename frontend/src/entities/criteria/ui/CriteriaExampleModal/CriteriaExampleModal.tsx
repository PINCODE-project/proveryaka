import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Spin, Typography } from 'antd';
import { Dispatch, FC, ReactNode, SetStateAction, Suspense, useCallback, useMemo, useState } from 'react';

import { ExampleType } from '@entities/example/common';
import { GetCriteriaExample } from '@entities/example/criteria-example';

import { getModuleClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CriteriaExampleModal.module.css';
import { Example } from './Example';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
    examplesRaw: GetCriteriaExample[];
}>;

export const CriteriaExampleModal: FC<Props> = typedMemo(function CriteriaExampleModal({
    triggerComponent,
    examplesRaw,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const examples = useMemo(() => examplesRaw
        .filter(example => example.exampleType === ExampleType.Standard) ?? [],
    [examplesRaw]);
    const antiExamples = useMemo(() => examplesRaw
        .filter(example => example.exampleType === ExampleType.AntiExample) ?? [],
    [examplesRaw]);

    const [exampleIndex, setExampleIndex] = useState(0);
    const [antiExampleIndex, setAntiExampleIndex] = useState(0);

    const changeIndex = useCallback((index: number, count: number, onChange: Dispatch<SetStateAction<number>>) => {
        onChange((index + count) % count);
    }, []);

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    if (examples.length === 0 && antiExamples.length === 0) {
        return null;
    }
    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
                className={getModuleClasses(styles, 'modal', { full: examples.length > 0 && antiExamples.length > 0 })}
            >
                <Flex wrap="nowrap" gap={40}>
                    {examples.length > 0 &&
                        <Flex vertical gap={24} className={styles.column}>
                            <Flex gap={4} align="center" >
                                {examples.length > 1 && <Button
                                    onClick={() => changeIndex(exampleIndex - 1, examples.length, setExampleIndex)}
                                    type="text"
                                    icon={<LeftOutlined />}
                                />}
                                <Typography className={styles.title}>
                                    Эталон
                                </Typography>
                                {examples.length > 1 && <Button
                                    onClick={() => changeIndex(exampleIndex + 1, examples.length, setExampleIndex)}
                                    type="text"
                                    icon={<RightOutlined />}
                                />}
                            </Flex>

                            <Suspense fallback={<Flex align="center" justify="center"><Spin /></Flex>}>
                                <Example example={examples[exampleIndex]} />
                            </Suspense>
                        </Flex>}
                    {antiExamples.length > 0 &&
                        <Flex vertical gap={24} className={styles.column}>
                            <Flex gap={4}>
                                {antiExamples.length > 1 && <Button
                                    onClick={() => changeIndex(antiExampleIndex - 1, antiExamples.length, setAntiExampleIndex)}
                                    type="text"
                                    icon={<LeftOutlined />}
                                />}
                                <Typography className={styles.title}>
                                    Антрипример
                                </Typography>
                                {antiExamples.length > 1 && <Button
                                    onClick={() => changeIndex(antiExampleIndex - 1, antiExamples.length, setAntiExampleIndex)}
                                    type="text"
                                    icon={<RightOutlined />}
                                />}
                            </Flex>

                            <Suspense fallback={<Flex align="center" justify="center"><Spin /></Flex>}>
                                <Example example={antiExamples[antiExampleIndex]} />
                            </Suspense>
                        </Flex>
                    }
                </Flex>
            </Modal>
        </>
    );
});
