import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Input, MenuProps, notification, Select, Typography } from 'antd';
import { FC, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';
import { SpaceIssuesButton } from '@pages/space/SpacePage/subpages/SpaceIssuesPage/SpaceIssuesButton';

import { DeleteIssueButton } from '@features/issue/delete-issue/ui/DeleteIssueButton';
import { PublishIssueArguments, usePublishIssue } from '@features/issue/publish-issue/lib/usePublishIssue';

import { GetIssueResponse, getSpaceIssueQueryKey } from '@entities/issue';
import { DistributedType } from '@entities/issue/model/DistributedType';
import { GetIssueFilters } from '@entities/issue/model/GetIssueFilters';
import { IssuesTable } from '@entities/issue/ui/IssuesTable';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceIssuesPage.module.css';

export type Props = ClassNameProps & TestProps;

export const SpaceIssuesPage: FC<Props> = typedMemo(function SpaceTeamsPage({
    className,
}) {
    const queryClient = useQueryClient();
    const { isOrganizer, isStudent } = useRolesCheck();
    const spaceId = useSpaceId();

    const [filters, changeFilters] = useListFilters<GetIssueFilters>({
        page: 0,
        count: 10,
        search: '',
        status: null,
        isDistributed: DistributedType.None,
    });

    const onSuccessPublishIssue = useCallback((_: boolean, variables: PublishIssueArguments) => {
        notification.success({
            message: 'Открытие сдачи',
            description: (
                <Typography.Text>
                    Задание {<Typography.Text strong>{variables.name}</Typography.Text>} открыто для сдачи
                </Typography.Text>
            ),
        });
        queryClient.invalidateQueries(getSpaceIssueQueryKey(spaceId!, filters));
    }, [filters, queryClient, spaceId]);

    const { mutate: publishIssue } = usePublishIssue({
        onSuccess: onSuccessPublishIssue,
        retry: false,
    });

    const renderActions = useCallback((_: string, record: GetIssueResponse) => {
        const items: MenuProps['items'] = [
            {
                key: '1',
                label: 'Редактировать',
                disabled: true,
            },
        ];

        if (record.status === 0) {
            items.push({
                key: '2',
                label: 'Открыть для сдачи',
                onClick: () => publishIssue({ id: record.id, name: record.name! }),
            });
        }

        items.push(
            {
                key: '3',
                label: 'Назначить проверяющих',
                disabled: true,
            },
            {
                key: '4',
                label: 'Выгрузить оценки в Excel',
                disabled: true,
            },
            {
                key: '5',
                label: <DeleteIssueButton
                    issueId={record.id ?? ''}
                    issueName={record.name ?? ''}
                    onSuccess={() => {
                    }}
                    triggerComponent={onDelete => (
                        <Typography.Text onClick={onDelete} className={styles.menuItem}>
                            Удалить задание
                        </Typography.Text>)}
                    filters={filters}
                    spaceId={spaceId!}
                />,
                danger: true,
            },
        );

        return (
            <div onClick={event => event.stopPropagation()}>
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined className={getModuleClasses(styles, 'settingsIcon')} />
                </Dropdown>
            </div>
        );
    }, [filters, publishIssue, spaceId]);

    const getStatusFilter = useCallback(() => {
        const result: {value: number | null; label: string}[] = [
            { value: null, label: 'Все статусы' },
        ];

        if (isOrganizer) {
            result.push({ value: 0, label: 'Не опубликовано' });
        }

        result.push(
            { value: 1, label: 'Открыта сдача' },
            { value: 5, label: 'Сдача просрочена' },
        );

        if (isStudent) {
            result.push({ value: 6, label: 'Сдано' });
        }

        result.push(
            { value: 2, label: 'На проверке' },
            { value: 8, label: 'Проверка просрочена' },
            { value: 9, label: 'Проверено' },
        );

        return result;
    }, [isStudent, isOrganizer]);

    if (!spaceId) {
        return <Navigate to={SpaceRouter.Spaces} />;
    }

    return (
        <Flex gap={28} vertical className={className}>
            <Flex align="center" justify="space-between" gap={16}>
                <Flex gap="middle">
                    <Input.Search
                        placeholder="Поиск"
                        allowClear
                        onSearch={value => {
                            changeFilters('search', value);
                            changeFilters('page', 0);
                        }}
                        style={{ width: 250 }}
                    />
                    <Select
                        defaultValue={null}
                        style={{ width: 200 }}
                        onChange={value => {
                            changeFilters('status', value);
                            changeFilters('page', 0);
                        }}
                        options={getStatusFilter()}
                    />
                </Flex>

                <SpaceIssuesButton spaceId={spaceId} />
            </Flex>

            <IssuesTable
                spaceId={spaceId}
                filters={filters}
                changeFilters={changeFilters}
                actionRender={renderActions}
            />
        </Flex>
    );
});
