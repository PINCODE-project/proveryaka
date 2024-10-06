import { Button, Flex, Form, Modal, notification, Select } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import {
    getSpaceExpertsQueryKey,
    getSpaceOrganizerQueryKey,
    getSpacesQueryKey,
    getSpaceStudentsQueryKey,
} from '@entities/space';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';
import { useGetUserAll } from '@entities/user';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './AddUserInSpaceModal.module.css';
import { useAddUserInSpace } from '../../lib/useAddUserInSpace';
import { AddUserToSpaceRequest } from '../../model/AddUserToSpaceRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    spaceId: string;
}>;

export const AddUserInSpaceModal: FC<Props> = typedMemo(function AddUserInSpaceModal({
    triggerComponent,
    spaceId,
}) {
    const [notify, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();

    const { data: users } = useGetUserAll();

    const [isOpen, setIsOpen] = useState(false);
    const { mutate: add } = useAddUserInSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceExpertsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            notify.success({
                message: 'Пользователи добавлены в пространство',
            });
            setIsOpen(false);
        },
    });

    const onSubmit = useCallback(async (form: AddUserToSpaceRequest) => {
        add({
            ...form,
            spaceId,
        });
    }, [spaceId, add]);

    const onOpen = useCallback(() => setIsOpen(true), []);

    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {contextHolder}
            {triggerComponent(onOpen)}
            <Modal
                title="Добавление участников"
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
                >
                    <Flex gap={12} vertical>
                        <Flex gap={20} vertical>
                            <Form.Item<AddUserToSpaceRequest>
                                className={styles.formItem}
                                label="Пользователи"
                                name="userProfileIdList"
                                rules={[
                                    { required: true, message: 'Выберите пользователей' },
                                ]}
                            >
                                <Select mode="multiple" placeholder="Не выбрано">
                                    {users?.userInfoList?.map(user => (
                                        <Select.Option value={user.id}>
                                            {user.surname} {user.name} {user.patronymic}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item<AddUserToSpaceRequest>
                                className={styles.formItem}
                                name="spaceRoleType"
                                label="Роль"
                                rules={[
                                    { required: true, message: 'Выберите роль' },
                                ]}
                            >
                                <Select placeholder="Не выбрано">
                                    <Select.Option value={SpaceRoleType.Student}>Студент</Select.Option>
                                    <Select.Option value={SpaceRoleType.Expert}>Эксперт</Select.Option>
                                    <Select.Option value={SpaceRoleType.Organizer}>Организатор</Select.Option>
                                </Select>
                            </Form.Item>
                        </Flex>

                        <Form.Item className={styles.submitButton}>
                            <Button type="primary" htmlType="submit" block>
                                Добавить
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
});
