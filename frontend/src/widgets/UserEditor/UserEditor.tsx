import { Modal, Tabs, TabsProps } from 'antd';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { ChangePasswordForm } from '@features/user/change-password';
import { EditUserForm } from '@features/user/edit-profile';

import { getBemClasses, typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './UserEditor.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const UserEditor: FC<Props> = typedMemo(function UserEditor({
    triggerComponent,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    const items: TabsProps['items'] = useMemo(() => [
        {
            key: '1',
            label: 'Личная информация',
            children: <EditUserForm onSuccess={onClose} />,
        },
        {
            key: '2',
            label: 'Пароль',
            children: <ChangePasswordForm onSuccess={onClose} />,
        },
    ], [onClose]);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
                title="Настройки профиля"
                footer={false}
                className={getModuleClasses(styles, 'modal')}
            >
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                />
            </Modal>
        </>
    );
});
