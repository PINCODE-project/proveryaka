import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Modal, notification, Spin } from 'antd';
import { FC, Suspense, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';

import { TeamEditor, TeamForm } from '@entities/team';
import { getSpaceTeamsQueryKey } from '@entities/team/lib/getSpaceTeamsQueryKey';
import { getSpaceUserTeamsQueryKey } from '@entities/team/lib/getSpaceUserTeamsQueryKey';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateTeamModal.module.css';
import { useCreateTeam } from '../../lib/useCreateTeam';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
}>;

export const CreateTeamModal: FC<Props> = typedMemo(function CreateTeamModal({
    spaceId,
}) {
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();
    const [isOpen, setIsOpen] = useState(false);

    const { mutate: create } = useCreateTeam({
        onSuccess: () => {
            api.success({
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

    const submit = useCallback((form: TeamEditor) => {
        create({
            ...form,
            entityId: spaceId,
        });
    }, [create, spaceId]);

    return (
        <>
            {contextHolder}
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
                <Suspense fallback={<Flex justify="center"><Spin /></Flex>}>
                    <TeamForm
                        spaceId={spaceId}
                        submit={submit}
                        submitButton={
                            <Form.Item className={getModuleClasses(styles, 'submitButton')}>
                                <Button type="primary" htmlType="submit">
                                Создать
                                </Button>
                            </Form.Item>
                        }
                    />
                </Suspense>
            </Modal>
        </>
    );
});
