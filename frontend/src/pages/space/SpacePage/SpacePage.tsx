import {
    FolderOpenOutlined,
    FileDoneOutlined,
    UserOutlined,
    EllipsisOutlined,
    TeamOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useMemo } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { DeleteSpaceButton } from '@features/space/delete-space';
import { EditSpaceModal } from '@features/space/edit-space';
import { ExitUserButton } from '@features/space/exit-user';

import { isOrganizer, useGetSpaceSettings } from '@entities/space';
import { useGetSpace } from '@entities/space/lib/useGetSpace';
import { useGetSpaceRoles } from '@entities/space/lib/useGetSpaceRoles';

import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Avatar, Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpacePage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpacePage: FC<Props> = typedMemo(function SpacePage({
    className,
    'data-testid': dataTestId = 'SpacePage',
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const spaceId = useSpaceId();
    const { data: roles } = useGetSpaceRoles(spaceId ?? '');
    const { data: space } = useGetSpace(spaceId ?? '');
    const { data: spaceSettings } = useGetSpaceSettings(spaceId ?? '');

    const items: MenuProps['items'] = useMemo(() => [
        {
            key: '1',
            label: <EditSpaceModal
                triggerComponent={
                    onOpen => <Typography.Text onClick={onOpen}>Изменить пространство</Typography.Text>
                }
                spaceId={spaceId ?? ''}
            />,
        },
        {
            key: '2',
            label: 'Добавить пользователей',
            disabled: true,
        },
        {
            key: '3',
            label: 'Скопировать код',
            disabled: true,
        },
        {
            key: '4',
            label: 'Перегенрировать код',
            disabled: true,
        },
        {
            key: '5',
            label: <ExitUserButton
                spaceName={space?.name ?? ''}
                spaceId={spaceId ?? ''}
                onSuccess={() => navigate(SpaceRouter.Spaces)}
                triggerComponent={onExit => (
                    <Typography.Text onClick={onExit} className={styles.menuItem}>
                Покинуть пространство
                    </Typography.Text>
                )}
            />,
        },
        {
            key: '6',
            label: <DeleteSpaceButton
                spaceName={space?.name ?? ''}
                spaceId={spaceId ?? ''}
                onSuccess={() => new Promise(resolve => {
                    navigate(SpaceRouter.Spaces);
                    setTimeout(resolve, 300);
                })}
                triggerComponent={onDelete => (
                    <Typography.Text onClick={onDelete} className={styles.menuItem}>
                        Удалить пространство
                    </Typography.Text>)}
            />,
            danger: true,
        },
    ], [spaceId, navigate, space]);

    if (!spaceId || !space) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    if (location.pathname === SpaceRouter.Space(spaceId)) {
        return <Navigate to={SpaceRouter.SpaceTasks(spaceId)} replace />;
    }
    if (location.pathname === SpaceRouter.SpaceTeams(spaceId) && !spaceSettings?.isUseTeam) {
        return <Navigate to={SpaceRouter.SpaceTasks(spaceId)} replace />;
    }
    return (
        <Flex
            gap={40}
            className={getModuleClasses(styles, 'root', null, className)}
            data-testid={dataTestId}
        >
            <Sidebar>
                <SidebarItem
                    to={SpaceRouter.SpaceTasks(spaceId)}
                    text="Задания"
                    icon={className => <FolderOpenOutlined className={className} /> }
                />
                <SidebarItem
                    to={SpaceRouter.SpaceSolutions(spaceId)}
                    text="Работы"
                    icon={className => <FileDoneOutlined className={className} /> }
                />
                <SidebarItem
                    to={SpaceRouter.SpaceUsers(spaceId)}
                    text="Участники"
                    icon={className => <UserOutlined className={className} /> }
                />
                {spaceSettings?.isUseTeam
                    ? <SidebarItem
                        to={SpaceRouter.SpaceTeams(spaceId)}
                        text="Команды"
                        icon={className => <TeamOutlined className={className} />}
                    />
                    : null}
            </Sidebar>

            <Flex vertical gap={32} className={getModuleClasses(styles, 'content')}>
                <Flex
                    align="center"
                    justify="space-between"
                    gap="middle"
                    className={getModuleClasses(styles, 'header')}
                >
                    <Link to={SpaceRouter.Spaces} className={getModuleClasses(styles, 'backLink')}>
                        <LeftOutlined className={getModuleClasses(styles, 'backIcon')} />
                        <Typography.Text className={getModuleClasses(styles, 'backText')}>
                            Назад
                        </Typography.Text>
                    </Link>

                    <UserPanel />
                </Flex>

                <Flex gap={25} align="center">
                    <Flex gap={20} align="center">
                        <Avatar shape="square" size={40} fileId={space.iconFileId}
                            apiType="estimate"
                        />

                        <Typography.Text className={getModuleClasses(styles, 'title')}>
                            {space.name}
                        </Typography.Text>
                    </Flex>

                    {isOrganizer(roles!)
                        ? <Dropdown menu={{ items }}>
                            <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                        </Dropdown>
                        : null}
                </Flex>
                <Outlet />
            </Flex>
        </Flex>
    );
});
