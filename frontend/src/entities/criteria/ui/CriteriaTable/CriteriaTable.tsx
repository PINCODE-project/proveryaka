import { Button, Table, TableColumnsType } from 'antd';
import { FC, useMemo } from 'react';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CriteriaTable.module.css';
import { useGetIssueCriteria } from '../../lib/useGetIssueCriteria';
import { GetCriteriaResponse } from '../../model/GetCriteriaResponse';
import { CriteriaExampleModal } from '../CriteriaExampleModal';

export type Props = ClassNameProps & TestProps & Readonly<{
    issueId: string;
}>;

export const CriteriaTable: FC<Props> = typedMemo(function CriteriaTable({
    issueId,
}) {
    const { data: criteria } = useGetIssueCriteria(issueId);

    const columns = useMemo<TableColumnsType<GetCriteriaResponse>>(() => [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Вес',
            dataIndex: 'weight',
            key: 'weight',
            render: weight => `${Math.floor(weight * 100)}%`,
        },
        {
            title: 'Шкала оценки',
            dataIndex: 'marks',
            key: 'marks',
            render: (_, record) => `${record.minScore} - ${record.maxScore}`,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            render: description => <p className={styles.description}>{description}</p>,
        },
        {
            title: false,
            dataIndex: 'action',
            key: 'action',
            width: 180,
            render: (_, record) => (<CriteriaExampleModal
                triggerComponent={open => <Button onClick={open} type="default">Примеры выполнения</Button>}
                criteriaId={record.id}
            />),
        },
    ], []);

    return (
        <Table
            columns={columns}
            dataSource={criteria?.entityList ?? []}
        />
    );
});
