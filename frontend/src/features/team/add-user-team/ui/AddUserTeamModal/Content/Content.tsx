import { App, Button, Flex, Form, Select } from 'antd';
import { FC, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useAddUserTeam } from '@features/team/add-user-team/lib/useAddUserTeam';
import { AddUserTeam } from '@features/team/add-user-team/model/AddUserTeam';

import { useGetSpaceStudents } from '@entities/space';
import { getSpaceTeamsQueryKey } from '@entities/team';

import { sortSelectOptionsByLabel, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Content.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    entityId: string;
    teamId: string;
    spaceId: string;
    onClose: () => void;
}>;

export const Content: FC<Props> = typedMemo(function Content({
    spaceId,
    teamId,
    entityId,
    onClose,
}) {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();

    const { data: users } = useGetSpaceStudents(spaceId);
    const { mutate: add } = useAddUserTeam({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceTeamsQueryKey(entityId));
            notification.success({
                message: 'Пользователи добавлены в команду',
            });
            onClose();
        },
    });

    const onSubmit = useCallback((form: AddUserTeam) => {
        add({
            ...form,
            entityId,
            teamId,
        });
    }, [entityId, add, teamId]);

    return (
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
                    <Select mode="multiple" placeholder="Не выбрано" filterOption={sortSelectOptionsByLabel}>
                        {users?.studentInfoList?.map(user => (
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
    );
});
