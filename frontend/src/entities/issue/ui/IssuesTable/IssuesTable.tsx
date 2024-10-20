import { Table, TableColumnsType, TablePaginationConfig, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useMemo } from 'react';

// eslint-disable-next-line
import { GetIssueResponse, useGetSpaceIssue } from "@entities/issue";
import { useRolesCheck } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSpaceIssueCount } from '../../lib/useGetSpaceIssueCount';
import { GetIssueFilters } from '../../model/GetIssueFilters';
import { IssueStatus, IssueStringStatus } from '../../model/IssueStatus';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    actionRender?: ColumnType<GetIssueResponse>['render'];
    filters: GetIssueFilters;
    changeFilters: (key: ('page' | 'count' | 'isDistributed'), name: (number | undefined)) => void;
}>;

export const IssuesTable: FC<Props> = typedMemo(function TeamsTable({
    spaceId,
    actionRender,
    filters,
    changeFilters,
}) {
    const { isOrganizer, isStudent } = useRolesCheck();

    const { data: issues } = useGetSpaceIssue(spaceId, filters);
    const { data: issueCount } = useGetSpaceIssueCount(spaceId, filters);

    const handlePaginationChange = (pagination: TablePaginationConfig) => {
        changeFilters('page', pagination.current! - 1 || 0);
        changeFilters('count', pagination.pageSize || 10);
    };

    const columns = useMemo<TableColumnsType<GetIssueResponse>>(() => {
        const result: TableColumnsType<GetIssueResponse> = [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Дедлайн сдачи',
                dataIndex: 'submitDeadlineDateUtc',
                key: 'submitDeadlineDateUtc',
                render: (value: string) => new Date(value).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            },
            {
                title: 'Дедлайн проверки',
                dataIndex: 'assessmentDeadlineDateUtc',
                key: 'assessmentDeadlineDateUtc',
                render: (value: string) => new Date(value).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            },
        ];

        if (isStudent) {
            result.push(
                {
                    title: 'Оценка',
                    dataIndex: 'status',
                    key: 'status',
                    // TODO PROV-311 blocked
                    render: () => `${0}/100`,
                },
            );
        } else {
            result.push(
                {
                    title: 'Сдано',
                    dataIndex: 'allSolutionCount',
                    key: 'allSolutionCount',
                    render: (value: number, record) => `${value}/${record.allTeamCountInSpace}`,
                },
                {
                    title: 'Проверено',
                    dataIndex: 'reviewedSolutionCount',
                    key: 'reviewedSolutionCount',
                    render: (value: number, record) => `${value}/${record.allSolutionCount}`,
                },
            );
        }

        result.push({
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (value: number) => <Tag>{IssueStringStatus[IssueStatus[value]]}</Tag>,
        });

        if (isOrganizer) {
            result.push({
                title: false,
                dataIndex: 'action',
                key: 'action',
                width: 24,
                render: actionRender,
                hidden: actionRender === undefined,
            });
        }

        return result;
    }, [actionRender, isStudent, isOrganizer]);

    if (issues?.entityList?.length === 0) {
        return <EmptyTable text="Список заданий пуст" />;
    }

    return (
        <Table
            rowKey="id"
            columns={columns}
            // expandable={{ expandedRowRender }}
            dataSource={issues?.entityList || []}
            onChange={handlePaginationChange}
            pagination={{
                hideOnSinglePage: true,
                current: filters.page! + 1,
                pageSize: filters.count,
                total: issueCount?.count || 0,
            }}
        />
    );
});
