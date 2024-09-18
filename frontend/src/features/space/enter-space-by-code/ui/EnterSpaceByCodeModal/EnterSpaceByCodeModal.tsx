import { Button, Form, Input, Modal, notification } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './EnterSpaceByCodeModal.module.css';
import { useEnterByCode } from '../../lib/useEnterByCode';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const EnterSpaceByCodeModal: FC<Props> = typedMemo(function EnterSpaceByCodeModal({
    triggerComponent,
}) {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: enter } = useEnterByCode({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            api.success({
                message: 'Вы добавлены в пространство',
            });
            setIsOpen(false);
        },
    });

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {contextHolder}
            {triggerComponent(onOpen)}
            <Modal
                title="Введите пригласительный код"
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <Form
                    name="EnterSpaceByCodeForm"
                    layout="vertical"
                    onFinish={data => enter(data.code)}
                    requiredMark={false}
                >
                    <Form.Item<{ code: string }>
                        name="code"
                        rules={[{ required: true, message: 'Введите код' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item className={getModuleClasses(styles, 'formItem')}>
                        <Button type="primary" htmlType="submit" className={getModuleClasses(styles, 'submitButton')}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});