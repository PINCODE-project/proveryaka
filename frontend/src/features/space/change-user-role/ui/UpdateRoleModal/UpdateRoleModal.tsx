import { Button, Flex, Form, Modal, notification, Select, Switch } from 'antd';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useUpdateRole } from '@features/space/change-user-role/lib/useUpdateRole';
import { UpdateRoleToUserInSpace } from '@features/space/change-user-role/model/UpdateRoleToUserInSpace';
import { CreateSpaceRequest } from '@features/space/create-space/model/CreateSpaceRequest';

import {
    getSpaceExpertsQueryKey,
    getSpaceOrganizerQueryKey,
    getSpacesQueryKey,
    getSpaceStudentsQueryKey, SpaceForm,
} from '@entities/space';
import { SpaceAccessType } from '@entities/space/model/SpaceAccessType';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';
import { useGetCurrentUserInfo } from '@entities/user';

import { createFile } from '@shared/api/file/createFile';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './UpdateRoleModal.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    spaceId: string;
    userId: string;
    userFullName: string;
    spaceRole: SpaceRoleType;
}>;

export const UpdateRoleModal: FC<Props> = typedMemo(function UpdateRoleModal({
    triggerComponent,
    spaceId,
    userFullName,
    userId,
    spaceRole,
}) {
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const initialValues = useMemo(() => ({
        spaceRoleType: spaceRole,
    }), [spaceRole]);

    const { mutate: update } = useUpdateRole({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceExpertsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            api.success({
                message: 'Роль изменена',
            });
            setIsOpen(false);
        },
    });

    const onSubmit = useCallback((form: UpdateRoleToUserInSpace) => {
        update({
            ...form,
            userId,
            spaceId,
        });
    }, [userId, spaceId, update]);

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {contextHolder}
            {triggerComponent(onOpen)}
            <Modal
                title={`Изменение роли ${userFullName}`}
                footer={false}
                open={isOpen}
                onClose={onClose}
                onCancel={onClose}
            >
                <Form
                    className={styles.form}
                    name="SpaceForm"
                    layout="vertical"
                    onFinish={onSubmit}
                    requiredMark={false}
                    initialValues={initialValues}
                >
                    <Flex vertical gap={12}>
                        <Form.Item<UpdateRoleToUserInSpace>
                            name="spaceRoleType"
                            className={styles.formItem}
                        >
                            <Select>
                                <Select.Option value={SpaceRoleType.Student}>Студент</Select.Option>
                                <Select.Option value={SpaceRoleType.Expert}>Эксперт</Select.Option>
                                <Select.Option value={SpaceRoleType.Organizer}>Организатор</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item className={styles.submitButton}>
                            <Button type="primary" htmlType="submit" >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
});