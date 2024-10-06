import {
    FileTextOutlined,
    FileDoneOutlined,
    CommentOutlined,
    EllipsisOutlined,
    LeftOutlined,
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useMemo } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { SolutionStatusBadge, useGetSolution } from '@entities/solution';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpaceSolutionPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionPage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpacePage',
}) {
    const location = useLocation();

    const spaceId = useSpaceId();
    const solutionId = useSolutionId();

    const { isOrganizer } = useRolesCheck();
    const { data: solution } = useGetSolution(solutionId ?? '');

    const items: MenuProps['items'] = useMemo(() => [
        {
            key: '0',
            label: 'Назначить проверяющих',
            disabled: true,
        },
    ], []);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    if (!solutionId || !solution) {
        return <Navigate to={SpaceRouter.Space(spaceId)} />;
    }
    if (location.pathname === SpaceRouter.SpaceSolution(spaceId, solutionId)) {
        return <Navigate to={SpaceRouter.SpaceSolutionCommon(spaceId, solutionId)} replace />;
    }
    return (
        <Flex
            gap={40}
            className={getModuleClasses(styles, 'root', null, className)}
            data-testid={dataTestId}
        >
            <Sidebar>
                <SidebarItem
                    to={SpaceRouter.SpaceSolutionCommon(spaceId, solutionId)}
                    text="Работа"
                    icon={className => <FileTextOutlined className={className} />}
                />
                <SidebarItem
                    to={SpaceRouter.SpaceSolutionMarks(spaceId, solutionId)}
                    text="Оценки"
                    icon={className => <FileDoneOutlined className={className} />}
                />
                <SidebarItem
                    to={SpaceRouter.SpaceSolutionFeedback(spaceId, solutionId)}
                    text="Работы"
                    icon={className => <CommentOutlined className={className} />}
                />
            </Sidebar>

            <Flex vertical gap={32} className={getModuleClasses(styles, 'content')}>
                <Flex
                    align="center"
                    justify="space-between"
                    gap="middle"
                    className={getModuleClasses(styles, 'header')}
                >
                    <Link to={SpaceRouter.SpaceSolutions(spaceId)} className={getModuleClasses(styles, 'backLink')}>
                        <LeftOutlined className={getModuleClasses(styles, 'backIcon')} />
                        <Typography.Text className={getModuleClasses(styles, 'backText')}>
                            Назад
                        </Typography.Text>
                    </Link>

                    <UserPanel />
                </Flex>

                <Flex vertical gap={10}>
                    <Flex gap={25} align="center" justify="space-between">
                        <Flex gap={20} align="center">
                            <Typography.Text className={getModuleClasses(styles, 'title')}>
                                {solution.issueName}
                            </Typography.Text>

                            <Typography.Text>
                                <SolutionStatusBadge status={} />
                            </Typography.Text>
                        </Flex>

                        {isOrganizer
                            ? <Dropdown menu={{ items }}>
                                <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                            </Dropdown>
                            : null}
                    </Flex>

                    <Flex gap={6}>
                        {true
                            ? <UserOutlined />
                            : <TeamOutlined />}
                        {solution.authorName}
                    </Flex>
                </Flex>
                <Outlet />
            </Flex>
        </Flex>
    );
});
