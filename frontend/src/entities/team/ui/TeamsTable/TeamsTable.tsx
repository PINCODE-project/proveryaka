import { Table, TableColumnsType } from 'antd';
import { FC, useCallback } from 'react';

import { useGetSpaceTeams } from '@entities/team/lib/useGetSpaceTeams';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSpaceUserTeams } from '../../lib/useGetSpaceUserTeams';
import { GetTeam } from '../../model/GetTeam';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
}>;

const columns: TableColumnsType<GetTeam> = [
    {
        title: 'Команда',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Количество участников',
        dataIndex: 'studentCount',
        key: 'studentCount',
        render: (_, record) => record.studentInfoList?.length ?? 0,
    },
    {
        title: 'Version',
        dataIndex: 'version',
        key: 'version',
    },
];

export const TeamsTable: FC<Props> = typedMemo(function TeamsTable({
    spaceId,
}) {
    const { data: teams, isLoading } = useGetSpaceTeams(spaceId);
    const expandedRowRender = useCallback((record: GetTeam) => {
        // TODO: возвращает StudentsTable (адо написать)
        return null;
    }, []);

    if ((teams?.teamList ?? []).length === 0) {
        return <EmptyTable text="В вашем пространстве нет команд" />;
    }
    return (
        <Table
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={teams?.teamList ?? []}
        />
    );
});
