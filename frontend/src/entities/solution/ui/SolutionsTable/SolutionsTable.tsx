import { Table, TableColumnsType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useCallback, useMemo } from 'react';
// Сущность пространства много где зайдествуется
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';
import { SpaceRouter } from '@pages/space';

import { StatusBadge } from '@entities/issue';
import { useGetIssueSolutionsCount, useGetSolutionsCount } from '@entities/solution';
import { useGetIssueSolutions } from '@entities/solution/lib/useGetIssueSolutions';
import { useRolesCheck } from '@entities/space';

import { useListFilters } from '@shared/hooks';
import { getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSolutions } from '../../lib/useGetSolutions';
import { GetSolutionForExpert } from '../../model/GetSolutionForExpert';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    actionRender?: ColumnType<GetSolutionForExpert>['render'];
}>;

export const SolutionsTable: FC<Props> = typedMemo(function SolutionsTable({
    spaceId,
    actionRender,
}) {
    const navigate = useNavigate();
    const { isOrganizer } = useRolesCheck();

    const [filters, setFilters] = useListFilters({ page: 1, count: 10 });

    const { data: organizationSolutions } = useGetIssueSolutions(spaceId, filters, { enabled: isOrganizer });
    const { data: reviewerSolutions } = useGetSolutions(spaceId, filters, { enabled: !isOrganizer });
    const { data: organizationSolutionsCount } = useGetIssueSolutionsCount(spaceId, filters, { enabled: isOrganizer });
    const { data: reviewerSolutionsCount } = useGetSolutionsCount(spaceId, filters, { enabled: !isOrganizer });

    const solutions = useMemo(
        () => isOrganizer
            ? { data: organizationSolutions, count: organizationSolutionsCount }
            : { data: reviewerSolutions, count: reviewerSolutionsCount },
        [organizationSolutions, reviewerSolutions, isOrganizer, organizationSolutionsCount, reviewerSolutionsCount],
    );

    const columns = useMemo<TableColumnsType<GetSolutionForExpert>>(() => [
        {
            title: 'Задание',
            dataIndex: 'issueName',
            key: 'issueName',
        },
        {
            title: 'Отправитель',
            dataIndex: 'authorName',
            key: 'authorName',
            hidden: !isOrganizer,
        },
        {
            title: 'Дедлайн проверки',
            dataIndex: 'assessmentDeadlineDateUtc',
            key: 'assessmentDeadlineDateUtc',
            render: deadline => `${getDateFromISO(deadline)} ${getTimeFromISO(deadline)}`,
        },
        {
            title: 'Оценок',
            dataIndex: 'marks',
            key: 'marks',
            hidden: !isOrganizer,
            render: (_, record) => `${record.reviewCount}/${record.checksCountMax}`,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: status => <StatusBadge status={status} />,
        },
        {
            title: 'Оценка',
            dataIndex: 'mark',
            key: 'mark',
            render: (_, record) => `${record.mark}/100`,
        },
        {
            title: false,
            dataIndex: 'action',
            key: 'action',
            width: 24,
            render: actionRender,
            hidden: actionRender === undefined || !isOrganizer,
        },
    ], [actionRender, isOrganizer]);

    const onRow = useCallback((record: GetSolutionForExpert) => ({
        onClick: () => navigate(SpaceRouter.SpaceSolutionCommon(spaceId, record.id)),
    }), [navigate, spaceId]);

    if (solutions.data?.length === 0) {
        return <EmptyTable text="Нет работ" />;
    }
    return (
        <Table
            onRow={onRow}
            rowKey="id"
            pagination={{
                onChange: (page, count) => {
                    setFilters({ page, count });
                },
                current: filters.page,
                total: solutions.count,
                pageSize: filters.count,
            }}
            columns={columns}
            dataSource={solutions.data}
        />
    );
});
