import { Modal } from 'antd';
import { FC, ReactNode, Suspense, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback } from '@shared/ui';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    teamId: string;
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const EditTeamModal: FC<Props> = typedMemo(function EditTeamModal({
    spaceId,
    teamId,
    triggerComponent,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                title="Изменение команды"
                open={isOpen}
                footer={false}
                onCancel={onClose}
                onClose={onClose}
            >
                <Suspense fallback={<Fallback />}>
                    <Content spaceId={spaceId} teamId={teamId} onClose={onClose} />
                </Suspense>
            </Modal>
        </>
    );
});
