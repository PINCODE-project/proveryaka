import { Flex, Table, TableColumnsType, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FC, useMemo, useState } from 'react';

import { useRolesCheck } from '@entities/space';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { EmptyTable } from '@shared/ui';

import styles from './SolutionMarksTable.module.css';
import { useGetStudentSolutionReviews } from '../../lib/useGetStudentSolutionReviews';
import { CriteriaReview } from '../../model/CriteriaReview';
import { GetReviews } from '../../model/GetReviews';

export enum MarkType {
    Common,
    Criteria
}

export type Props = ClassNameProps & TestProps & Readonly<{
    solutionId: string;
    actionRender?: ColumnType<GetReviews>['render'];
    placeholder: string;
    defaultMarkType?: MarkType;
    canChangeMarkType?: boolean;
}>;

export const SolutionMarksTable: FC<Props> = typedMemo(function SolutionMarksTable({
    solutionId,
    actionRender,
    placeholder,
    defaultMarkType = MarkType.Common,
    canChangeMarkType = true,
}) {
    const { isOrganizer } = useRolesCheck();

    const { data: solution } = useGetStudentSolutionReviews(solutionId);
    const [markType, setMarkType] = useState(defaultMarkType);

    const criteriaMarks = useMemo((): CriteriaReview[] => {
        const criterias: Map<string, number> = new Map();
        const reviews: Map<string, CriteriaReview[]> = new Map();
        solution?.reviews.forEach(review => {
            review.reviews.forEach(review => {
                if (criterias.has(review.name ?? '')) {
                    reviews.get(review.name ?? '')?.push({
                        scoreCount: review.scoreCount,
                        comment: review.comment,
                        name: review.name,
                        maxScore: review.maxScore,
                    });
                } else {
                    reviews.set(review.name ?? '', [{
                        scoreCount: review.scoreCount,
                        comment: review.comment,
                        name: review.name,
                        maxScore: review.maxScore,
                    }]);
                    criterias.set(review.name ?? '', review.maxScore);
                }
            });
        });

        return Array.from(reviews).map(([_, value]) => {
            value[0].count = value.length;
            return value;
        }).reduce((prev, next) => prev.concat(next), []);
    }, [solution]);

    const commonColumns = useMemo<TableColumnsType<GetReviews>>(() => [
        {
            title: 'Эксперт',
            dataIndex: 'userId',
            key: 'userId',
            hidden: !isOrganizer,
            render: (_, record) => 'surname name patronymic',
        },
        {
            title: 'Оценка',
            dataIndex: 'mark',
            key: 'mark',
            render: mark => `${mark}/100`,
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            render: comment => (
                <Typography.Text className={styles.comment}>
                    {comment}
                </Typography.Text>),
        },
        {
            dataIndex: 'actions',
            key: 'actions',
            render: actionRender,
            hidden: !actionRender,
        },
    ], [actionRender, isOrganizer]);

    const criteriaColumns = useMemo<TableColumnsType<CriteriaReview>>(() => [
        {
            title: 'Критерий',
            dataIndex: 'name',
            key: 'name',
            onCell: record => ({
                rowSpan: record.count,
            }),
        },
        {
            title: 'Оценка',
            dataIndex: 'scoreCount',
            key: 'scoreCount',
            render: scoreCount => `${scoreCount}/100`,
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            render: comment => (
                <Typography.Text className={styles.comment}>
                    {comment}
                </Typography.Text>),
        },
    ], []);

    if (solution?.reviews?.length === 0) {
        return <EmptyTable text={placeholder} />;
    }

    return (
        <div>
            {canChangeMarkType
                ? <Flex gap={2}>
                    <div
                        onClick={() => setMarkType(MarkType.Common)}
                        className={getModuleClasses(styles, 'tab', { active: markType === MarkType.Common })}
                    >
                    Общие
                    </div>
                    <div
                        onClick={() => setMarkType(MarkType.Criteria)}
                        className={getModuleClasses(styles, 'tab', { active: markType === MarkType.Criteria })}
                    >
                    Критерии
                    </div>
                </Flex>
                : null}

            {
                markType === MarkType.Common
                    ? <Table
                        pagination={false}
                        columns={commonColumns}
                        dataSource={solution?.reviews}
                    />
                    : <Table
                        pagination={false}
                        columns={criteriaColumns}
                        dataSource={criteriaMarks}
                    />
            }
        </div>

    );
});
