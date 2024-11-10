import {
    CommentOutlined,
    EllipsisOutlined,
    EyeOutlined,
    FileDoneOutlined,
    FileTextOutlined,
    LeftOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd';
import { FC, Suspense, useCallback, useMemo } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { DistributeModal, useDistributeExpertToSolution } from '@features/solution/distribute-experts';

import { Status, StatusBadge, useGetSolution } from '@entities/solution';
import { useGetOrganizerSolution } from '@entities/solution/lib/useGetOrganizerSolution';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback, Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpaceSolutionPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceSolutionPage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpaceSolutionPage',
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const spaceId = useSpaceId();
    const solutionId = useSolutionId();

    const { isOrganizer } = useRolesCheck();
    const { data: reviewerSolution } = useGetSolution(solutionId ?? '', { enabled: !isOrganizer });
    const { data: organizerSolution } = useGetOrganizerSolution(solutionId ?? '', { enabled: isOrganizer });
    const solution = useMemo(
        () => isOrganizer ? organizerSolution : reviewerSolution,
        [isOrganizer, organizerSolution, reviewerSolution],
    );

    const { mutate: distribute } = useDistributeExpertToSolution();

    const items: MenuProps['items'] = useMemo(() => [
        {
            key: '0',
            label: <DistributeModal
                onSubmit={(onClose, expertIdList) => distribute({ expertIdList, solutionId: solutionId ?? '' }, { onSuccess: onClose })}
                triggerComponent={
                    open => (
                        <Typography onClick={open} className={styles.menuItem}>
                    Назначить проверяющих
                        </Typography>
                    )
                }
            />,
        },
    ], []);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    if (!solutionId || !solution) {
        return <Navigate to={SpaceRouter.SpaceIssues(spaceId)} />;
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
                    text="Обратная связь"
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
                                <StatusBadge status={solution.status!} />
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
                <Suspense fallback={<Fallback />}>
                    <Outlet />
                </Suspense>
            </Flex>
        </Flex>
    );
});
