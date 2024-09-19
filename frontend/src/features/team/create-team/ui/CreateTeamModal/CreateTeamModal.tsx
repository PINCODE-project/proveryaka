import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Form, Modal, Select } from 'antd';
import { FC, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useGetSpaceStudents } from '@entities/space';
import { TeamForm, TeamType } from '@entities/team';
import { getSpaceTeamsQueryKey } from '@entities/team/lib/getSpaceTeamsQueryKey';
import { getSpaceUserTeamsQueryKey } from '@entities/team/lib/getSpaceUserTeamsQueryKey';
import { useGetCurrentUserInfo } from '@entities/user';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateTeamModal.module.css';
import { useCreateTeam } from '../../lib/useCreateTeam';
import { CreateTeam } from '../../model/CreateTeam';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
}>;

export const CreateTeamModal: FC<Props> = typedMemo(function CreateTeamModal({
    spaceId,
}) {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();
    const [isOpen, setIsOpen] = useState(false);

    const { data: user } = useGetCurrentUserInfo();
    const { data: rawStudents } = useGetSpaceStudents(spaceId);
    const students = useMemo(() =>
        rawStudents?.studentInfoList?.filter(({ id }) => id !== user?.id) ?? [],
    [rawStudents, user]);

    const { mutate: create } = useCreateTeam({
        onSuccess: () => {
            notification.success({
                message: 'Команда создана',
            });
            setIsOpen(false);
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId));
        },
    });

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const submit = useCallback((form: CreateTeam) => {
        create({
            ...form,
            entityId: spaceId,
            teamType: TeamType.Space,
            userProfileIdList: form.userProfileIdList ?? [],
        });
    }, [create, spaceId]);

    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={onOpen}
            >
                Создать команду
            </Button>
            <Modal
                title="Создание команды"
                open={isOpen}
                footer={false}
                onCancel={onClose}
                onClose={onClose}
            >
                <TeamForm
                    submit={submit}
                    submitButton={
                        <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                            <Button type="primary" htmlType="submit">
                                Создать
                            </Button>
                        </Form.Item>
                    }
                    additionalFormItems={(
                        <Form.Item<CreateTeam>
                            label="Участники"
                            name="userProfileIdList"
                        >
                            <Select mode="multiple" placeholder="Не выбрано">
                                {students.map(student => (
                                    <Select.Option value={student.id} key={student.id}>
                                        {student.surname} {student.name} {student.patronymic}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                />
            </Modal>
        </>
    );
});
