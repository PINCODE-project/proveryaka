import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { CreateTeamModal } from '@features/team/create-team';
import { EditTeamModal } from '@features/team/edit-team';

import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { TeamsTable, GetTeam } from '@entities/team';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceTeamsPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceTeamsPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,

}) {
    const { isStudent } = useRolesCheck();
    const spaceId = useSpaceId();

    const renderActions = useCallback((_: string, record: GetTeam) => {
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
                label: 'Покинуть команду',
                disabled: true,
            },
            {
                key: '3',
                label: 'Удалить команду',
                disabled: true,
                danger: true,
            },
        ];

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, []);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    return (
        <Flex gap={28} vertical className={ className}>
            <Flex align="center" justify="space-between" gap={16}>
                <Typography.Text>
                    Filters
                </Typography.Text>
                {isStudent ? <CreateTeamModal spaceId={spaceId} /> : null}
            </Flex>

            <TeamsTable spaceId={spaceId} actionRender={renderActions} />
        </Flex>
    );
});
