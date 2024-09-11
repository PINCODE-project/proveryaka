import { Avatar, Flex, Table, TableColumnProps, Typography } from 'antd';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { useGetSpaces } from '../../lib/useGetSpaces';
import { GetSpaceResponse } from '../../model/GetSpaceResponse';

export type Props = ClassNameProps & TestProps & Readonly<{
    renderActions?: TableColumnProps<GetSpaceResponse>['render'];
}>;

export const SpacesTable: FC<Props> = typedMemo(function SpacesTable({
    renderActions,
}) {
    const navigate = useNavigate();
    const { data: spaces } = useGetSpaces();

    const columns = useMemo<TableColumnProps<GetSpaceResponse>[]>(() => [
        {
            title: 'Пространство',
            dataIndex: 'name',
            key: 'name',
            render: (_, space) => (
                <Flex gap="small" align="center">
                    <Avatar size={32} src={space.icon} shape="square" />
                    <Typography.Text>{space.name}</Typography.Text>
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
            render: (_, space) => (
                <Flex gap="small" align="center">
                    <Avatar size={32} src={space.icon} />
                    <Typography.Text>Name</Typography.Text>
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

    return (
        <Table
            onRow={record => {
                return {
                    onClick: () => navigate(SpaceRouter.Space(record.id)),
                };
            }}
            pagination={false}
            columns={columns}
            dataSource={spaces!.entityList ?? []}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
});
