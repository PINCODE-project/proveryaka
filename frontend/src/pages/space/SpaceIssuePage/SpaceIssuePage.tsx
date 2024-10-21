import {
    EllipsisOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    InfoCircleOutlined,
    LeftOutlined,
    OrderedListOutlined,
    ReadOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Dropdown, Flex, notification, Typography } from 'antd';
import { FC, Suspense, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { UserPanel } from '@widgets/UserPanel';

import { DeleteIssueButton } from '@features/issue/delete-issue';
import { PublishIssueArguments, usePublishIssue } from '@features/issue/publish-issue/lib/usePublishIssue';

import { getIssueQueryKey, getSpaceIssueQueryKey, StatusBadge, useGetIssue } from '@entities/issue';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useIssueId } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { Fallback, Sidebar, SidebarItem } from '@shared/ui';

import styles from './SpaceIssuePage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceIssuePage: FC<Props> = typedMemo(function SpaceSolutionPage({
    className,
    'data-testid': dataTestId = 'SpacePage',
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const spaceId = useSpaceId();
    const issueId = useIssueId();

    const { isOrganizer, isStudent } = useRolesCheck();
    const { data: issue } = useGetIssue(issueId ?? '');

    const onSuccessPublishIssue = useCallback((_: boolean, variables: PublishIssueArguments) => {
        notification.success({
            message: 'Открытие сдачи',
            description: (
                <Typography.Text>
                    Задание {<Typography.Text strong>{variables.name}</Typography.Text>} открыто для сдачи
                </Typography.Text>
            ),
        });
        queryClient.invalidateQueries(getSpaceIssueQueryKey(spaceId!));
        queryClient.invalidateQueries(getIssueQueryKey(issueId!));
    }, [queryClient, spaceId, issueId]);

    const { mutate: publishIssue } = usePublishIssue({
        onSuccess: onSuccessPublishIssue,
        retry: false,
    });

    const items = useMemo(() => {
        if (!issue) return [];

        const items = [];

        if (issue.status === 0) {
            items.push(
                {
                    label: 'Открыть для сдачи',
                    onClick: () => publishIssue({ id: issue.id!, name: issue.name! }),
                },
            );
        }

        items.push(
            {
                label: 'Назначить проверяющих',
                disabled: true,
            },
            {
                label: <DeleteIssueButton
                    issueId={issue.id!}
                    issueName={issue.name!}
                    filters={undefined}
                    spaceId={spaceId!}
                    onSuccess={() => navigate(SpaceRouter.SpaceIssues(spaceId!))}
                    triggerComponent={onDelete => (
                        <Typography.Text onClick={onDelete} className={styles.menuItem}>
                            Удалить задание
                        </Typography.Text>
                    )}
                />,
                danger: true,
            },
        );
        return items.map((item, index) => ({ ...item, key: index }));
    }, [issue, spaceId, publishIssue, navigate]);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }
    if (!issueId || !issue) {
        return <Navigate to={SpaceRouter.SpaceIssues(spaceId)} />;
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
                {isStudent
                    ? <SidebarItem
                        to={SpaceRouter.SpaceIssueMarks(spaceId, issueId)}
                        text="Оценки"
                        icon={className => <FileDoneOutlined className={className} />}
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
                    <Link to={SpaceRouter.SpaceIssues(spaceId)} className={getModuleClasses(styles, 'backLink')}>
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
                <Suspense fallback={<Fallback />}>
                    <Outlet />
                </Suspense>
            </Flex>
        </Flex>
    );
});
