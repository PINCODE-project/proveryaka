import { Button, Form, Modal, notification, Switch } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { CreateSpaceRequest } from '@features/space/create-space/model/CreateSpaceRequest';

import { getSpacesQueryKey, SpaceForm } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateSpaceModal.module.css';
import { useCreateSpace } from '../../lib/useCreateSpace';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const CreateSpaceModal: FC<Props> = typedMemo(function CreateSpaceModal({
    triggerComponent,
}) {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: create } = useCreateSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            api.success({
                message: 'Пространство создано',
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
                title="Создание пространства"
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <SpaceForm
                    submit={create}
                    additionalFormItems={
                        <Form.Item<CreateSpaceRequest>
                            label="Команды"
                            layout="horizontal"
                            name={['spaceSettings', 'isUseTeam']}
                        >
                            <Switch />
                        </Form.Item>
                    }
                    submitButton={(
                        <Form.Item className={getModuleClasses(styles, 'formItem')}>
                            <Button type="primary" htmlType="submit" block>
                                Создать
                            </Button>
                        </Form.Item>
                    )}
                />
            </Modal>
        </>
    );
});
