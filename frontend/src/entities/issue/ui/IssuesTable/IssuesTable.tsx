import { Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceRouter } from '@pages/space';

import { GetIssueResponse, StatusBadge, useGetSpaceIssue } from '@entities/issue';
import { useGetSpaceStudentIssue } from '@entities/issue/lib/useGetSpaceStudentIssue';
import { useRolesCheck } from '@entities/space';

import { getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSpaceIssueCount } from '../../lib/useGetSpaceIssueCount';
import { GetIssueFilters } from '../../model/GetIssueFilters';

type OnChange = NonNullable<TableProps<GetIssueResponse>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    actionRender?: ColumnType<GetIssueResponse>['render'];
    filters: GetIssueFilters;
    changeFilters: (value: Partial<GetIssueFilters>) => void;
}>;

const keyToOrderBy: Record<string, number> = {
    submitDeadlineDateUtc: 0,
    assessmentDeadlineDateUtc: 1,
    allSolutionCount: 3,
    reviewedSolutionCount: 4,
    mark: 5,
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

    const { data: notStudentissues } = useGetSpaceIssue(
        spaceId,
        filters,
        {
            orderBy: keyToOrderBy[sortedInfo.field as string] ?? 2,
            isDesc: sortedInfo.order === 'descend',
        },
        {
            enabled: !isStudent,
        },
    );

    const { data: studentIssues } = useGetSpaceStudentIssue(
        spaceId,
        filters,
        {
            orderBy: keyToOrderBy[sortedInfo.field as string] ?? 2,
            isDesc: sortedInfo.order === 'descend',
        },
        {
            enabled: isStudent,
        },
    );

    const issues = isStudent ? studentIssues : notStudentissues;
    const { data: issueCount } = useGetSpaceIssueCount(spaceId, {
        ...filters,
        isPublished: isStudent ? true : filters.isPublished,
    });

    const handleChange: OnChange = (pagination: TablePaginationConfig, filters, sorter) => {
        setSortedInfo(sorter as Sorts);
        changeFilters({ page: pagination.current! - 1 || 0, count: pagination.pageSize || 10 });
    };

    const columns = useMemo<TableColumnsType<GetIssueResponse>>(() => {
        return [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Дедлайн сдачи',
                dataIndex: 'submitDeadlineDateUtc',
                key: 'submitDeadlineDateUtc',
                render: (value: string) => `${getDateFromISO(value)} ${getTimeFromISO(value)}`,
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'submitDeadlineDateUtc' ? sortedInfo.order : null,
            },
            {
                title: 'Дедлайн проверки',
                dataIndex: 'assessmentDeadlineDateUtc',
                key: 'assessmentDeadlineDateUtc',
                render: (value: string) => `${getDateFromISO(value)} ${getTimeFromISO(value)}`,
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'assessmentDeadlineDateUtc' ? sortedInfo.order : null,
            },
            {
                title: 'Оценка',
                dataIndex: 'mark',
                key: 'mark',
                hidden: !isStudent,
                render: (value: number) => `${value}/100`,
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'mark' ? sortedInfo.order : null,
            },
            {
                title: 'Сдано',
                dataIndex: 'allSolutionCount',
                key: 'allSolutionCount',
                hidden: isStudent,
                render: (value: number, record) => `${value}/${record.allTeamCountInSpace}`,
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'allSolutionCount' ? sortedInfo.order : null,
            },
            {
                title: 'Проверено',
                dataIndex: 'reviewedSolutionCount',
                key: 'reviewedSolutionCount',
                hidden: isStudent,
                render: (value: number, record) => `${value}/${record.allSolutionCount}`,
                sorter: () => 0,
                sortOrder: sortedInfo.columnKey === 'reviewedSolutionCount' ? sortedInfo.order : null,
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
                render: (value: number) => <StatusBadge status={value} />,
            },
            {
                title: false,
                dataIndex: 'action',
                key: 'action',
                width: 24,
                render: actionRender,
                hidden: actionRender === undefined || !isOrganizer,
            },
        ];
    }, [sortedInfo.columnKey, sortedInfo.order, isStudent, isOrganizer, actionRender]);

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
