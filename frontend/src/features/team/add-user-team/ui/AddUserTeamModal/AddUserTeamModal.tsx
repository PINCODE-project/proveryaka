import { Modal } from 'antd';
import { FC, ReactNode, Suspense, useCallback, useState } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback } from '@shared/ui';

import { Content } from './Content';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    entityId: string;
    teamId: string;
    spaceId: string;
}>;

export const AddUserTeamModal: FC<Props> = typedMemo(function AddUserTeamModal({
    triggerComponent,
    teamId,
    entityId,
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
                <Suspense fallback={<Fallback />}>
                    <Content
                        entityId={entityId}
                        teamId={teamId}
                        spaceId={spaceId}
                        onClose={onClose}
                    />
                </Suspense>
            </Modal>
        </>
    );
});
