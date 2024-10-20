import {
    InfoCircleOutlined,
    ReadOutlined,
    OrderedListOutlined,
    EllipsisOutlined,
    LeftOutlined,
    FileAddOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, useMemo } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { StatusBadge, useGetIssue } from '@entities/issue';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useIssueId } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpaceIssuePage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceIssuePage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpacePage',
}) {
    const location = useLocation();

    const spaceId = useSpaceId();
    const issueId = useIssueId();

    const { isOrganizer } = useRolesCheck();
    const { data: issue } = useGetIssue(issueId ?? '');

    const items: MenuProps['items'] = useMemo(() => [
        {
            key: '0',
            label: 'Открыть для сдачи',
            disabled: true,
        },
        {
            key: '1',
            label: 'Назначить проверяющих',
            disabled: true,
        },
        {
            key: '2',
            label: 'Удалить',
            danger: true,
            disabled: true,
        },
    ], []);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    if (!issueId || !issue) {
        return <Navigate to={SpaceRouter.SpaceTasks(spaceId)} />;
    }
    if (location.pathname === SpaceRouter.SpaceIssue(spaceId, issueId)) {
        return <Navigate to={SpaceRouter.SpaceIssueDescription(spaceId, issueId)} />;
    }
    return (
        <Flex
            gap={40}
            className={getModuleClasses(styles, 'root', null, className)}
            data-testid={dataTestId}
        >
            <Sidebar>
                <SidebarItem
                    to={SpaceRouter.SpaceIssueDescription(spaceId, issueId)}
                    text="Описание"
                    icon={className => <InfoCircleOutlined className={className} />}
                />
                <SidebarItem
                    to={SpaceRouter.SpaceIssueMaterials(spaceId, issueId)}
                    text="Полезные материалы"
                    icon={className => <ReadOutlined className={className} />}
                />
                <SidebarItem
                    to={SpaceRouter.SpaceIssueCriteria(spaceId, issueId)}
                    text="Критерии"
                    icon={className => <OrderedListOutlined className={className} />}
                />
                <SidebarItem
                    to={SpaceRouter.SpaceIssueForm(spaceId, issueId)}
                    text="Форма сдачи"
                    icon={className => <FileAddOutlined className={className} />}
                />
            </Sidebar>

            <Flex vertical gap={32} className={getModuleClasses(styles, 'content')}>
                <Flex
                    align="center"
                    justify="space-between"
                    gap="middle"
                    className={getModuleClasses(styles, 'header')}
                >
                    <Link to={SpaceRouter.SpaceTasks(spaceId)} className={getModuleClasses(styles, 'backLink')}>
                        <LeftOutlined className={getModuleClasses(styles, 'backIcon')} />
                        <Typography.Text className={getModuleClasses(styles, 'backText')}>
                            Назад
                        </Typography.Text>
                    </Link>

                    <UserPanel />
                </Flex>

                <Flex vertical gap={10}>
                    <Flex gap={25} align="center" justify="space-between">
                        <Flex gap={40} align="center">
                            <Typography.Text className={getModuleClasses(styles, 'title')}>
                                {issue.name}
                            </Typography.Text>

                            <StatusBadge status={issue.status ?? 0} type="issue" />
                        </Flex>

                        {isOrganizer
                            ? <Flex align="center" gap={12}>
                                <SettingOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                                <Dropdown menu={{ items }}>
                                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                                </Dropdown>
                            </Flex>
                            : null}
                    </Flex>
                </Flex>
                <Outlet />
            </Flex>
        </Flex>
    );
});
