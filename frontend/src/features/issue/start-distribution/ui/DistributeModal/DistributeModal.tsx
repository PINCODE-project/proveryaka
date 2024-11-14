import { Modal } from 'antd';
import { FC, ReactNode, Suspense, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { Fallback } from '@shared/ui';

import { Content } from './Content/Content';

export type Props = Readonly<{
    onSubmit: (onClose: () => void, userIdList: string[]) => void;
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const DistributeModal: FC<Props> = typedMemo(function DistributeModal({
    onSubmit,
    triggerComponent,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                title="Назначение проверяющих"
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <Suspense fallback={<Fallback />}>
                    <Content onSubmit={ids => onSubmit(onClose, ids)} />
                </Suspense>
            </Modal>
        </>
    );
});
