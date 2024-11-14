import { Flex, Table, TableColumnProps, TablePaginationConfig, TableProps, Typography } from 'antd';
import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { useGetSpaces, useRolesCheck } from '@entities/space';
import { useGetSpacesCount } from '@entities/space/lib/useGetSpacesCount';
import { GetSpacesFilters } from '@entities/space/model/GetSpacesFilters';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Avatar } from '@shared/ui';

import { GetSpaceResponse } from '../../model/GetSpaceResponse';

type OnChange = NonNullable<TableProps<GetSpaceResponse>['onChange']>;

export type Props = ClassNameProps & TestProps & Readonly<{
    renderActions?: TableColumnProps<GetSpaceResponse>['render'];
    filters: GetSpacesFilters;
    changeFilters: (value: Partial<GetSpacesFilters>) => void;
}>;

export const SpacesTable: FC<Props> = typedMemo(function SpacesTable({
    renderActions,
    filters,
    changeFilters,
}) {
    const navigate = useNavigate();
    const { data: spaces } = useGetSpaces(filters);
    const { data: spacesCount } = useGetSpacesCount(filters);
    const { isExpert } = useRolesCheck();

    const handleChange: OnChange = (pagination: TablePaginationConfig) => {
        changeFilters({ page: pagination.current! - 1 || 0, count: pagination.pageSize || 10 });
    };

    const columns = useMemo<TableColumnProps<GetSpaceResponse>[]>(() => [
        {
            title: 'Пространство',
            dataIndex: 'name',
            key: 'name',
            render: (_, space) => (
                <Flex gap="small" align="center">
                    <Avatar
                        size={32}
                        fileId={space.iconFileId}
                        shape="square"
                        apiType="estimate"
                    />
                    <Typography.Text style={{ flex: 1 }}>
                        {space.name}
                    </Typography.Text>
                </Flex>
            ),
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Владелец',
            dataIndex: '',
            key: '',
            width: 150,
            render: (_, space) => (
                <Flex gap="small" align="center">
                    <Avatar
                        size={32}
                        fileId={space.authorAvatar}
                        shape="square"
                        apiType="estimate"
                    />
                    <Typography.Text style={{ flex: 1 }}>
                        {space.authorName}
                    </Typography.Text>
                </Flex>
            ),
        },
        {
            width: 40,
            title: false,
            dataIndex: '',
            key: 'action',
            hidden: renderActions === undefined,
            render: renderActions,
        },
    ], [renderActions]);

    const onRow = useCallback((record: GetSpaceResponse) => ({
        onClick: () => navigate(isExpert ? SpaceRouter.SpaceSolutions(record.id) : SpaceRouter.SpaceIssues(record.id)),
    }), [isExpert, navigate]);

    return (
        <Table
            onRow={onRow}
            columns={columns}
            dataSource={spaces!.entityList! ?? []}
            showSorterTooltip={{ target: 'sorter-icon' }}
            onChange={handleChange}
            pagination={{
                hideOnSinglePage: false,
                current: filters.page! + 1,
                pageSize: filters.count,
                total: spacesCount?.count || 0,
            }}
        />
    );
});
