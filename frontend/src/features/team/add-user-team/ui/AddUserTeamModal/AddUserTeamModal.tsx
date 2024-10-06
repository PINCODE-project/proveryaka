import { Button, Flex, Form, Modal, notification, Select } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { getSpaceTeamsQueryKey } from '@entities/team';
import { useGetUserAll } from '@entities/user';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './AddUserTeamModal.module.css';
import { useAddUserTeam } from '../../lib/useAddUserTeam';
import { AddUserTeam } from '../../model/AddUserTeam';

export type Props = ClassNameProps & TestProps & Readonly<{
    triggerComponent: (onOpen: () => void) => ReactNode;
    entityId: string;
    teamId: string;
}>;

export const AddUserTeamModal: FC<Props> = typedMemo(function AddUserTeamModal({
    triggerComponent,
    teamId,
    entityId,
}) {
    const [notify, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();

    const { data: users } = useGetUserAll();

    const [isOpen, setIsOpen] = useState(false);
    const { mutate: add } = useAddUserTeam({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceTeamsQueryKey(entityId));
            notify.success({
                message: 'Пользователи добавлены в команду',
            });
            setIsOpen(false);
        },
    });

    const onSubmit = useCallback((form: AddUserTeam) => {
        add({
            ...form,
            entityId,
            teamId,
        });
    }, [entityId, add, teamId]);

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
                        <Form.Item<AddUserTeam>
                            className={styles.formItem}
                            label="Пользователи"
                            name="userProfileIdList"
                            rules={[
                                { required: true, message: 'Выберите пользователей' },
                            ]}
                        >
                            <Select mode="multiple" placeholder="Не выбрано">
                                {users?.userInfoList?.map(user => (
                                    <Select.Option value={user.id} key={user.id}>
                                        {user.surname} {user.name} {user.patronymic}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

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
