import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { App, Dropdown, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { AddUserTeamModal } from '@features/team/add-user-team';
import { EditTeamModal } from '@features/team/edit-team';
import { useLeaveTeam } from '@features/team/leave-team';
import { useRemoveTeamUser } from '@features/team/remove-team-user';

import { GetStudentResponse } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import {
    TeamsTable,
    GetTeam,
    getSpaceUserTeamsQueryKey,
    getSpaceTeamsQueryKey, TeamType,
} from '@entities/team';
import { GetTeamFilters } from '@entities/team/model/GetTeamFilters';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import styles from './SpaceTeamsPage.module.css';

export type Props = ClassNameProps & TestProps & {
    filters: GetTeamFilters;
    setFilters: (filters: GetTeamFilters) => void;
};

export const Content: FC<Props> = typedMemo(function Content({
    filters,
    setFilters,
}) {
    const { notification } = App.useApp();
    const queryClient = useQueryClient();
    const { isStudent, isOrganizer } = useRolesCheck();
    const spaceId = useSpaceId();

    const { mutate: removeTeamUser } = useRemoveTeamUser({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId ?? ''));
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId ?? ''));
        },
    });

    const { mutate: leaveTeam } = useLeaveTeam({
        onSuccess: (_, context) => {
            notification.success({
                message: 'Выход из команды',
                description: <>Вы покинули команду <b>{context.name}</b></>,
            });
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId ?? ''));
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId ?? ''));
        },
    });

    const handleLeave = useCallback(async (team: GetTeam) => {
        const canDelete = await customConfirm({
            title: 'Покинуть команду',
            text: <>Вы уверены, что хотите покинуть команду <b>{team.name}</b>?</>,
        });

        if (!canDelete) {
            return;
        }

        leaveTeam(team);
    }, [leaveTeam]);

    const handleRemove = useCallback(async (team: GetTeam, user: GetStudentResponse) => {
        const canDelete = await customConfirm({
            title: 'Удалить из команды',
            text: <>Вы уверен, что хотите удалить <b>{user.patronymic} {user.name} {user.surname}</b> из команды?</>,
        });

        if (!canDelete) {
            return;
        }

        removeTeamUser({
            teamId: team.id,
            entityId: spaceId ?? '',
            userId: user.id,
            teamType: TeamType.Space,
        });
    }, [removeTeamUser, spaceId]);

    const renderActions = useCallback((_: string, record: GetTeam) => {
        if (!isStudent && !isOrganizer) {
            return undefined;
        }

        const items: MenuProps['items'] = [
            {
                key: '1',
                label: <EditTeamModal
                    spaceId={spaceId ?? ''}
                    teamId={record.id}
                    triggerComponent={onOpen => (
                        <Typography.Text onClick={onOpen} className={styles.menuItem}>
                            Изменить команду
                        </Typography.Text>
                    )}
                />,
            },
            {
                key: '2',
                label: <AddUserTeamModal
                    entityId={spaceId ?? ''}
                    spaceId={spaceId ?? ''}
                    teamId={record.id}
                    triggerComponent={onOpen => (
                        <Typography.Text onClick={onOpen} className={styles.menuItem}>
                            Добавить участников
                        </Typography.Text>
                    )}
                />,
            },
        ];

        if (isStudent) {
            items.push({
                key: '3',
                label: 'Покинуть команду',
                onClick: () => handleLeave(record),
            });
        }

        items.push({
            key: '4',
            label: 'Удалить команду',
            disabled: true,
            danger: true,
        });

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, [spaceId, isStudent, isOrganizer, handleLeave]);

    const renderStudentActions = useCallback((team: GetTeam) =>
        function renderStudentActions(_: string, record: GetStudentResponse) {
            return (
                <DeleteOutlined
                    className={styles.deleteUserFromTeamIcon}
                    onClick={() => handleRemove(team, record)}
                />
            );
        }, [handleRemove]);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <TeamsTable
            filters={filters}
            setFilters={setFilters}
            placeholder={isOrganizer ? 'В пространстве нет команд' : 'Вы не состоите в команде'}
            spaceId={spaceId}
            actionRender={renderActions}
            renderStudentActions={isOrganizer ? renderStudentActions : undefined}
        />
    );
});
