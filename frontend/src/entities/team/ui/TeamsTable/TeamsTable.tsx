import { Table, TableColumnsType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, Suspense, useCallback, useMemo } from 'react';

// Сущность пространства много где зайдествуется
// eslint-disable-next-line
import { GetStudentResponse, StudentTable } from '@entities/space';

import { useRolesCheck } from '@entities/space/lib/useRolesCheck';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable, Fallback } from '@shared/ui';

import { useGetSpaceTeams } from '../../lib/useGetSpaceTeams';
import { useGetSpaceUserTeams } from '../../lib/useGetSpaceUserTeams';
import { GetTeam } from '../../model/GetTeam';
import { GetTeamFilters } from '../../model/GetTeamFilters';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    placeholder?: string;
    actionRender?: ColumnType<GetTeam>['render'];
    renderStudentActions?: (team: GetTeam) => ColumnType<GetStudentResponse>['render'];
    filters: GetTeamFilters;
    setFilters: (filters: GetTeamFilters) => void;
}>;

export const TeamsTable: FC<Props> = typedMemo(function TeamsTable({
    spaceId,
    renderStudentActions,
    actionRender,
    placeholder = 'В пространстве нет команд',
    filters,
}) {
    const { isStudent } = useRolesCheck();

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
        return (
            <Suspense fallback={<Fallback />}>
                <StudentTable
                    students={record.studentInfoList ?? []}
                    renderActions={renderStudentActions?.(record)}
                />
            </Suspense>
        );
    }, [renderStudentActions]);

    if (teams.length === 0) {
        return <EmptyTable text={placeholder} />;
    }
    return (
        <Table
            rowKey="id"
            /* pagination={{
                total: 1000,
                onChange: (page, count) => {
                    setFilters({ page: count !== filters.count ? 0 : page, count });
                },
                pageSize: filters.count,
                current: filters.page,
            }} */
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={teams}
        />
    );
});
