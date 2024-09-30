import { App, Button, Form, Modal, Switch } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { getSpacesQueryKey, SpaceForm } from '@entities/space';
import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';
import { useGetCurrentUserInfo } from '@entities/user';

import { createFile } from '@shared/api/file/createFile';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateSpaceModal.module.css';
import { useCreateSpace } from '../../lib/useCreateSpace';
import { CreateSpaceRequest } from '../../model/CreateSpaceRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const CreateSpaceModal: FC<Props> = typedMemo(function CreateSpaceModal({
    triggerComponent,
}) {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();

    const { data: user } = useGetCurrentUserInfo();

    const [isOpen, setIsOpen] = useState(false);
    const { mutate: create } = useCreateSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpacesQueryKey);
            notification.success({
                message: 'Пространство создано',
            });
            setIsOpen(false);
        },
    });

    const onSubmit = useCallback(async (form: CreateSpaceRequest, file: File | null) => {
        let iconFileId: string | null = null;
        try {
            if (file) {
                iconFileId = (await createFile(file)).id;
            }
            // Обработка ошибки прописана в interceptor, здесь же необходим try для того
            // чтобы избежать выпадения ошибки здесь
        } catch {}

        create({
            ...form,
            iconFileId: iconFileId ?? null,
            organizerId: [user?.id ?? ''],
            accessType: SpaceAccessType.Private,
        });
    }, [create, user]);

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {triggerComponent(onOpen)}
            <Modal
                title="Создание пространства"
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <SpaceForm
                    submit={onSubmit}
                    additionalFormItems={
                        <Form.Item<CreateSpaceRequest>
                            label="Команды"
                            className={styles.formItem}
                            layout="horizontal"
                            name={['spaceSettings', 'isUseTeam']}
                        >
                            <Switch />
                        </Form.Item>
                    }
                    submitButton={(
                        <Form.Item className={styles.submitButton}>
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
