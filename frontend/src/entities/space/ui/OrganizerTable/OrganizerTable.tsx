import { Avatar, Flex, Table, TableColumnProps, Typography } from 'antd';
import { FC, useMemo } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { GetOrganizerResponse } from '../../model/GetOrganizerResponse';

export type Props = ClassNameProps & TestProps & Readonly<{
    renderActions?: TableColumnProps<GetOrganizerResponse>['render'];
    organizers: GetOrganizerResponse[];
}>;

export const OrganizerTable: FC<Props> = typedMemo(function OrganizerTable({
    renderActions,
    organizers,
}) {
    const columns = useMemo<TableColumnProps<GetOrganizerResponse>[]>(() => [
        {
            title: 'ФИО',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (_, user) => (
                <Flex gap="small" align="center">
                    <Avatar size={32} src={''} shape="square" />
                    <Typography.Text>
                        {user.surname} {user.name} {user.patronymic}
                    </Typography.Text>
                </Flex>
            ),
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Дополнительно',
            dataIndex: 'status',
            key: 'status',
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
            pagination={false}
            columns={columns}
            dataSource={organizers}
        />
    );
});
