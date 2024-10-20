import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Modal, Row, Spin } from 'antd';
import { Dispatch, FC, ReactNode, SetStateAction, Suspense, useCallback, useMemo, useState } from 'react';

import { ExampleType } from '@entities/example/common';
import { useGetCriteriaExamples } from '@entities/example/criteria-example';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CriteriaExampleModal.module.css';
import { Example } from './Example';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (open: () => void) => ReactNode;
    criteriaId: string;
}>;

export const CriteriaExampleModal: FC<Props> = typedMemo(function CriteriaExampleModal({
    triggerComponent,
    criteriaId,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const { data: examplesRaw } = useGetCriteriaExamples(criteriaId);
    const examples = useMemo(() => examplesRaw?.entityList
        ?.filter(example => example.exampleType === ExampleType.Standard) ?? [],
    [examplesRaw]);
    const antiExamples = useMemo(() => examplesRaw?.entityList
        ?.filter(example => example.exampleType === ExampleType.AntiExample) ?? [],
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
            >
                <Row gutter={40}>
                    {examples.length > 0 && <Col flex={1}>
                        <Flex vertical gap={24}>
                            <Flex gap={4}>
                                <Button
                                    onClick={() => changeIndex(exampleIndex - 1, examples.length, setExampleIndex)}
                                    type="text"
                                    icon={<LeftOutlined />}
                                />
                                Эталон
                                <Button
                                    onClick={() => changeIndex(exampleIndex + 1, examples.length, setExampleIndex)}
                                    type="text"
                                    icon={<RightOutlined />}
                                />
                            </Flex>

                            <Suspense fallback={<Flex align="center" justify="center"><Spin /></Flex>}>
                                <Example example={examples[exampleIndex]} />
                            </Suspense>
                        </Flex>
                    </Col>}
                    {antiExamples.length > 0 && <Col flex={1}>
                        <Flex vertical gap={24}>
                            <Flex gap={4}>
                                <Button
                                    onClick={() => changeIndex(antiExampleIndex - 1, antiExamples.length, setAntiExampleIndex)}
                                    type="text"
                                    icon={<LeftOutlined />}
                                />
                                Антрипример
                                <Button
                                    onClick={() => changeIndex(antiExampleIndex - 1, antiExamples.length, setAntiExampleIndex)}
                                    type="text"
                                    icon={<RightOutlined />}
                                />
                            </Flex>

                            <Suspense fallback={<Flex align="center" justify="center"><Spin /></Flex>}>
                                <Example example={antiExamples[antiExampleIndex]} />
                            </Suspense>
                        </Flex>
                    </Col>}
                </Row>
            </Modal>
        </>
    );
});
