import { App, Button, Flex, Form, Select } from 'antd';
import { FC, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useAddUserInSpace } from '@features/space/add-user-in-space/lib/useAddUserInSpace';
import { AddUserToSpaceRequest } from '@features/space/add-user-in-space/model/AddUserToSpaceRequest';

import { getSpaceExpertsQueryKey, getSpaceOrganizerQueryKey, getSpaceStudentsQueryKey } from '@entities/space';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';
import { useGetUserAll } from '@entities/user';

import { sortSelectOptionsByLabel, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Content.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    onClose: () => void;
}>;

export const Content: FC<Props> = typedMemo(function Content({
    spaceId,
    onClose,
}) {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();

    const { data: users } = useGetUserAll();
    const { mutate: add } = useAddUserInSpace({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceStudentsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceExpertsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceOrganizerQueryKey(spaceId));
            notification.success({
                message: 'Пользователи добавлены в пространство',
            });
            onClose();
        },
    });

    const onSubmit = useCallback((form: AddUserToSpaceRequest) => {
        add({
            ...form,
            spaceId,
        });
    }, [spaceId, add]);

    return (
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
                        <Select
                            mode="multiple"
                            placeholder="Не выбрано"
                            filterOption={sortSelectOptionsByLabel}
                        >
                            {users?.userInfoList?.map(user => (
                                <Select.Option value={user.id} key={`userSelect${user.id}`}>
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
    );
});
