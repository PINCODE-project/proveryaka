import { Table, TableColumnsType, TablePaginationConfig, TableProps, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useCallback, useMemo, useState } from 'react';

// eslint-disable-next-line
import { useNavigate } from "react-router-dom";
import { SpaceRouter } from '@pages/space';

import { GetIssueResponse, useGetSpaceIssue } from '@entities/issue';
import { useRolesCheck } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSpaceIssueCount } from '../../lib/useGetSpaceIssueCount';
import { GetIssueFilters } from '../../model/GetIssueFilters';
import { IssueStatus, IssueStringStatus } from '../../model/IssueStatus';

type OnChange = NonNullable<TableProps<GetIssueResponse>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    actionRender?: ColumnType<GetIssueResponse>['render'];
    filters: GetIssueFilters;
    changeFilters: (key: ('page' | 'count' | 'isDistributed'), name: (number | undefined)) => void;
}>;

const keyToOrderBy: Record<string, number> = {
    submitDeadlineDateUtc: 0,
    assessmentDeadlineDateUtc: 1,
};

export const IssuesTable: FC<Props> = typedMemo(function TeamsTable({
    spaceId,
    actionRender,
    filters,
    changeFilters,
}) {
    const navigate = useNavigate();
    const { isOrganizer, isStudent } = useRolesCheck();

    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const { data: issues } = useGetSpaceIssue(
        spaceId,
        filters,
        keyToOrderBy[sortedInfo.field as string] ?? 2,
        sortedInfo.order === 'descend',
    );
    const { data: issueCount } = useGetSpaceIssueCount(spaceId, filters);

    const handleChange: OnChange = (pagination: TablePaginationConfig, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter as Sorts);
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
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'submitDeadlineDateUtc' ? sortedInfo.order : null,
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
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'assessmentDeadlineDateUtc' ? sortedInfo.order : null,
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
                    // sorter: () => 0,
                    // sortOrder: sortedInfo.columnKey === 'reviewedSolutionCount' ? sortedInfo.order : null,
                },
            );
        } else {
            result.push(
                {
                    title: 'Сдано',
                    dataIndex: 'allSolutionCount',
                    key: 'allSolutionCount',
                    render: (value: number, record) => `${value}/${record.allTeamCountInSpace}`,
                    // sorter: () => 0,
                    // sortOrder: sortedInfo.columnKey === 'allSolutionCount' ? sortedInfo.order : null,
                },
                {
                    title: 'Проверено',
                    dataIndex: 'reviewedSolutionCount',
                    key: 'reviewedSolutionCount',
                    render: (value: number, record) => `${value}/${record.allSolutionCount}`,
                    // sorter: () => 0,
                    // sortOrder: sortedInfo.columnKey === 'reviewedSolutionCount' ? sortedInfo.order : null,
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

    const onRow = useCallback((record: GetIssueResponse) => ({
        onClick: () => navigate(SpaceRouter.SpaceIssueDescription(record.spaceId, record.id)),
    }), [navigate]);

    if (issues?.entityList?.length === 0) {
        return <EmptyTable text="Список заданий пуст" />;
    }

    return (
        <Table
            rowKey="id"
            onRow={onRow}
            columns={columns}
            dataSource={issues?.entityList || []}
            onChange={handleChange}
            pagination={{
                hideOnSinglePage: false,
                current: filters.page! + 1,
                pageSize: filters.count,
                total: issueCount?.count || 0,
            }}
        />
    );
});
