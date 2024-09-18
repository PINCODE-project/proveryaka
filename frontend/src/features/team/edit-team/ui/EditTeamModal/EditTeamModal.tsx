import { Button, Form, Modal, notification } from 'antd';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import {
    TeamForm,
    getSpaceTeamsQueryKey,
    getSpaceUserTeamsQueryKey,
    getTeamQueryKey,
    useGetTeam,
} from '@entities/team';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './EditTeamModal.module.css';
import { useEditTeam } from '../../lib/useEditTeam';
import { EditTeam } from '../../model/EditTeam';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    teamId: string;
    triggerComponent: (onOpen: () => void) => ReactNode;
}>;

export const EditTeamModal: FC<Props> = typedMemo(function EditTeamModal({
    spaceId,
    teamId,
    triggerComponent,
}) {
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();
    const [isOpen, setIsOpen] = useState(false);

    const { data: team } = useGetTeam(teamId);
    const initialValues = useMemo<EditTeam>(() => ({
        id: teamId,
        name: team?.name ?? '',
        users: team?.studentInfoList?.map(({ id }) => id) ?? [],
    }), [team, teamId]);

    const { mutate: edit } = useEditTeam({
        onSuccess: () => {
            api.success({
                message: 'Команда изменена',
            });
            setIsOpen(false);
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId));
            queryClient.resetQueries(getTeamQueryKey(spaceId));
        },
    });

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const submit = useCallback((form: EditTeam) => {
        edit({
            ...form,
            id: teamId,
        });
    }, [edit, teamId]);

    return (
        <>
            {contextHolder}
            {triggerComponent(onOpen)}
            <Modal
                title="Изменение команды"
                open={isOpen}
                footer={false}
                onCancel={onClose}
                onClose={onClose}
            >
                <TeamForm<EditTeam>
                    submit={submit}
                    initialValues={initialValues}
                    submitButton={
                        <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                            <Button type="primary" htmlType="submit" block>
                                Сохранить
                            </Button>
                        </Form.Item>
                    }
                />
            </Modal>
        </>
    );
});
