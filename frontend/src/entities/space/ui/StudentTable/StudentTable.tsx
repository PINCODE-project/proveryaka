import { Table, TableColumnProps } from 'antd';
import { FC, useMemo } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import { NameCell } from './NameCell';
import { GetStudentResponse } from '../../model/GetStudentResponse';

export type Props = ClassNameProps & TestProps & Readonly<{
    renderActions?: TableColumnProps<GetStudentResponse>['render'];
    students: GetStudentResponse[];
}>;

export const StudentTable: FC<Props> = typedMemo(function StudentTable({
    renderActions,
    students,
}) {
    const columns = useMemo<TableColumnProps<GetStudentResponse>[]>(() => [
        {
            title: 'ФИО',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (_, user) => <NameCell user={user} />,
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Группа',
            dataIndex: 'academicGroup',
            key: 'academicGroup',
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
            dataSource={students}
        />
    );
});
