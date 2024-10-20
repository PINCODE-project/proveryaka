import { Flex, Modal, Spin } from 'antd';
import { FC, ReactNode, Suspense, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    spaceId: string;
}>;

export const AddUserInSpaceModal: FC<Props> = typedMemo(function AddUserInSpaceModal({
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
                title="Добавление участников"
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
