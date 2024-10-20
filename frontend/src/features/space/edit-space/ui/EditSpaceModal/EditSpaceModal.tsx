import { Flex, Modal, Spin } from 'antd';
import { FC, ReactNode, Suspense, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    spaceId: string;
}>;

export const EditSpaceModal: FC<Props> = typedMemo(function EditSpaceModal({
    triggerComponent,
    spaceId,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                title="Изменение пространства"
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <Suspense fallback={<Flex align="center" justify="center"><Spin /></Flex>}>
                    <Content spaceId={spaceId} onClose={onClose} />
                </Suspense>
            </Modal>
        </>
    );
});
