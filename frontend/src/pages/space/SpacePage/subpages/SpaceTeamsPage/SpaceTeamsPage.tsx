import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { CreateTeamModal } from '@features/team/create-team';
import { EditTeamModal } from '@features/team/edit-team';
import { useRemoveTeamUser } from '@features/team/remove-team-user';

import { GetStudentResponse } from '@entities/space';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import {
    TeamsTable,
    GetTeam,
    useGetSpaceUserTeams,
    getSpaceUserTeamsQueryKey,
    getSpaceTeamsQueryKey, TeamType,
} from '@entities/team';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { customConfirm } from '@shared/ui';

import styles from './SpaceTeamsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTeamsPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,

}) {
    const queryClient = useQueryClient();
    const { isStudent, isOrganizer } = useRolesCheck();
    const spaceId = useSpaceId();

    const { data: studentTeams } = useGetSpaceUserTeams(spaceId ?? '', undefined, {
        enabled: isStudent,
    });

    const { mutate: removeTeamUser } = useRemoveTeamUser({
        onSuccess: () => {
            queryClient.resetQueries(getSpaceUserTeamsQueryKey(spaceId ?? ''));
            queryClient.resetQueries(getSpaceTeamsQueryKey(spaceId ?? ''));
        },
    });

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
        ];

        if (isStudent) {
            items.push({
                key: '2',
                label: 'Покинуть команду',
                disabled: true,
            });
        }

        items.push({
            key: '3',
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
    }, [spaceId, isStudent, isOrganizer]);

    const renderStudentActions = useCallback((team: GetTeam) =>
        function renderStudentActions(_: string, record: GetStudentResponse) {
            return (
                <DeleteOutlined
                    className={styles.deleteUserFromTeamIcon}
                    onClick={() => handleRemove(team, record)}
                />
            );
        }, [removeTeamUser, spaceId]);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex gap={28} vertical className={ className}>
            <Flex align="center" justify="space-between" gap={16}>
                <Typography.Text>
                    Filters
                </Typography.Text>
                {isStudent && studentTeams?.entityList.length === 0 ? <CreateTeamModal spaceId={spaceId} /> : null}
            </Flex>

            <TeamsTable
                spaceId={spaceId}
                actionRender={renderActions}
                renderStudentActions={isOrganizer ? renderStudentActions : undefined}
            />
        </Flex>
    );
});
