import { Table, TableColumnsType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useCallback, useMemo } from 'react';

// Сущность пространства много где зайдествуется
// eslint-disable-next-line
import {GetStudentResponse, StudentTable} from '@entities/space';

import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { useListFilters } from '@shared/hooks';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSpaceTeams } from '../../lib/useGetSpaceTeams';
import { useGetSpaceUserTeams } from '../../lib/useGetSpaceUserTeams';
import { GetTeam } from '../../model/GetTeam';
import { GetTeamFilters } from '../../model/GetTeamFilters';
import { TeamType } from '../../model/TeamType';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    placeholder?: string;
    actionRender?: ColumnType<GetTeam>['render'];
    renderStudentActions?: (team: GetTeam) => ColumnType<GetStudentResponse>['render'];
}>;

export const TeamsTable: FC<Props> = typedMemo(function TeamsTable({
    spaceId,
    renderStudentActions,
    actionRender,
    placeholder = 'В пространстве нет команд',
}) {
    const { isStudent } = useRolesCheck();

    const [filters] = useListFilters<GetTeamFilters>({ teamType: TeamType.Space });

    const { data: studentTeams } = useGetSpaceUserTeams(spaceId, filters, {
        enabled: isStudent,
    });
    const { data: organizerTeams } = useGetSpaceTeams(spaceId, filters, {
        enabled: !isStudent,
    });
    const teams = useMemo(() => {
        const teams = isStudent ? studentTeams?.entityList : organizerTeams?.entityList;
        return teams ?? [];
    }, [isStudent, studentTeams, organizerTeams]);

    const columns = useMemo<TableColumnsType<GetTeam>>(() => [
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
            title: false,
            dataIndex: 'action',
            key: 'action',
            width: 24,
            render: actionRender,
            hidden: actionRender === undefined,
        },
    ], [actionRender]);

    const expandedRowRender = useCallback((record: GetTeam) => {
        return (<StudentTable
            students={record.studentInfoList ?? []}
            renderActions={renderStudentActions?.(record)}
        />);
    }, [renderStudentActions]);

    if (teams.length === 0) {
        return <EmptyTable text={placeholder} />;
    }
    return (
        <Table
            rowKey="id"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={teams}
        />
    );
});
