import {
    FolderOpenOutlined,
    FileDoneOutlined,
    UserOutlined,
    EllipsisOutlined,
    TeamOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC } from 'react';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { CreateTeamModal } from '@features/team/create-team';

import { isOrganizer } from '@entities/space';
import { useGetSpace } from '@entities/space/lib/useGetSpace';
import { useGetSpaceRoles } from '@entities/space/lib/useGetSpaceRoles';

import LogoMin from '@shared/assets/images/logo-min.svg';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpacePage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Изменить пространство',
        disabled: true,
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
        label: 'Покинуть пространство',
        disabled: true,
    },
    {
        key: '6',
        label: 'Удалить пространство',
        disabled: true,
    },
];

export const SpacePage: FC<Props> = typedMemo(function SpacePage({
    className,
    'data-testid': dataTestId = 'SpacePage',
}) {
    const spaceId = useSpaceId();
    const { data: roles } = useGetSpaceRoles(spaceId ?? '');
    const { data: space } = useGetSpace(spaceId ?? '');

    if (!spaceId || !space) {
        return <Navigate to={SpaceRouter.Spaces} />;
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
                    to={SpaceRouter.SpaceTasks(spaceId)}
                    text="Задания"
                    icon={className => <FileDoneOutlined className={className} /> }
                />
                <SidebarItem
                    to={SpaceRouter.SpaceUsers(spaceId)}
                    text="Участники"
                    icon={className => <UserOutlined className={className} /> }
                />
                <SidebarItem
                    to={SpaceRouter.SpaceTeams(spaceId)}
                    text="Команды"
                    icon={className => <TeamOutlined className={className} /> }
                />
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

                    <Typography.Text>
                        User
                    </Typography.Text>
                </Flex>

                <Flex gap={25} align="center">
                    <Flex gap={20} align="center">
                        <Avatar shape="square" size={40} src={space.icon} />

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
                <CreateTeamModal spaceId={spaceId} />
                <Outlet />
            </Flex>
            <Outlet />
        </Flex>
    );
});
