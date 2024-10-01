import { Table, TableColumnsType } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useCallback, useMemo } from 'react';

// Сущность пространства много где зайдествуется
// eslint-disable-next-line
import {GetSolutionForExpert} from "@entities/solution/model/GetSolutionForExpert";
import { GetStudentResponse, StudentTable, useRolesCheck } from '@entities/space';

import { useListFilters } from '@shared/hooks';
import { getDateFromISO, getTimeFromISO, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import { useGetSolutions } from '../../lib/useGetSolutions';
import { GetSolution } from '../../model/GetSolution';

export type Props = ClassNameProps & TestProps & Readonly<{
    spaceId: string;
    actionRender?: ColumnType<GetSolutionForExpert>['render'];
}>;

export const SolutionsTable: FC<Props> = typedMemo(function SolutionsTable({
    spaceId,
    actionRender,
}) {
    const { isOrganizer } = useRolesCheck();

    const { data: solutions } = useGetSolutions(spaceId);

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
            title: 'Дедлайн оценки',
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
            dataIndex: 'marks',
            key: 'marks',
            render: (_, record) => `${record.reviewCount}/${record.checksCountMax}`,
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

    if (solutions?.length === 0) {
        return <EmptyTable text="Нет работ" />;
    }
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={solutions}
        />
    );
});
