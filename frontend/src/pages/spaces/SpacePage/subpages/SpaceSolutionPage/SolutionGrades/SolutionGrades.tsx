import { Collapse, Table } from 'antd';
import { FC, useState } from 'react';

import { useGetStudentSolutionReviews } from '@entities/solution/lib/useGetStudentSolutionReviews';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, NavTab, Text } from '@shared/ui';

import styles from './SolutionGrades.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    solutionId: string;
}>;

const columns = [
    {
        title: 'Общая оценка',
        dataIndex: 'mark',
        key: 'mark',
    },
    {
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
    },
];

export const SolutionGrades: FC<Props> = typedMemo(function SolutionGrades({
    className,
    solutionId,
    'data-testid': dataTestId = 'SolutionGrades',
}) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const { data: reviews } = useGetStudentSolutionReviews(solutionId ?? '');

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
            alignItems="stretch"
        >
            <FlexContainer
                direction="row"
                overflow="nowrap"
                alignItems="center"
                gap="l"
            >
                <NavTab
                    isActive={currentIndex === null}
                    name="Общее"
                    onClick={() => setCurrentIndex(null)}
                />
                {
                    reviews?.reviews.map((_, index) => (
                        <NavTab
                            key={index}
                            isActive={currentIndex === index}
                            name={`Оценка ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))
                }
            </FlexContainer>

            {
                currentIndex === null
                    ? <Table columns={columns} dataSource={reviews?.reviews ?? []} />
                    : <FlexContainer direction="column" gap="m">
                        <Text className={getBemClasses(styles, 'rate')}>Оценка: {reviews?.reviews?.[currentIndex].mark}</Text>

                        {reviews?.reviews?.[currentIndex]?.reviews.map(review => (
                            <Collapse
                                className={getBemClasses(styles, 'collapse')}
                                items={[{
                                    key: '1',
                                    label: <FlexContainer direction="row" gap="m" justifyContent="space-between"
                                        overflow="nowrap"
                                    >
                                        <Text className={getBemClasses(styles, 'name')}>{review.name}</Text>

                                        <FlexContainer direction="row" gap="xs" alignItems="center">
                                            <Text className={getBemClasses(styles, 'params')}>
                                                Оценка: {review.scoreCount}/{review.maxScore}
                                            </Text>
                                        </FlexContainer>
                                    </FlexContainer>,
                                    children: <FlexContainer direction="column" gap="m">
                                        <FlexContainer direction="column">
                                            <Text className={getBemClasses(styles, 'subtitle')}>
                                                Комментарий
                                            </Text>
                                            <Text className={getBemClasses(styles, 'description')}>
                                                {review.comment || '-'}
                                            </Text>
                                        </FlexContainer>
                                    </FlexContainer>,
                                }]}
                            />))}
                    </FlexContainer>
            }
        </FlexContainer>
    );
});
