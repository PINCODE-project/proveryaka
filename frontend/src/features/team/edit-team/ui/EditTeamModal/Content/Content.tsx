import { App, Button, Form } from 'antd';
import { FC, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';

import { useEditTeam } from '@features/team/edit-team/lib/useEditTeam';
import { EditTeam } from '@features/team/edit-team/model/EditTeam';

import { getSpaceTeamsQueryKey, getSpaceUserTeamsQueryKey, getTeamQueryKey, TeamForm, useGetTeam } from '@entities/team';

import { getModuleClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './Content.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    teamId: string;
    onClose: () => void;
}>;

export const Content: FC<Props> = typedMemo(function Content({
    spaceId,
    teamId,
    onClose,
}) {
    const queryClient = useQueryClient();
    const { notification } = App.useApp();
    const { data: team } = useGetTeam(teamId);
    const initialValues = useMemo<EditTeam>(() => ({
        id: teamId,
        name: team?.name ?? '',
        users: team?.studentInfoList?.map(({ id }) => id) ?? [],
    }), [team, teamId]);

    const { mutate: edit } = useEditTeam({
        onSuccess: () => {
            notification.success({
                message: 'Команда изменена',
            });
            onClose();
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId));
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId));
            queryClient.resetQueries(getTeamQueryKey(spaceId));
        },
    });

    const submit = useCallback((form: EditTeam) => {
        edit({
            ...form,
            id: teamId,
        });
    }, [edit, teamId]);

    return (
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
    );
});
