import { Table } from 'antd';
import { FC, useState } from 'react';

import { useGetSolutionReviews } from '@entities/solution/lib/useGetSolutionReviews';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, NavTab, SolutionExample, Text } from '@shared/ui';

import styles from './SolutionGrades.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

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
    'data-testid': dataTestId = 'SolutionGrades',
}) {
    const solutionId = useSolutionId();

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const { data: reviews } = useGetSolutionReviews(solutionId ?? '');

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
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
                    : reviews?.reviews?.[currentIndex]?.reviews.map(review => (
                        <FlexContainer direction="column" key={review.id}>
                            <Text>{review.name}</Text>
                            <Text>Оценка: {review.scoreCount}/{review.maxScore}</Text>
                            <FlexContainer direction="column" gap="xs">
                                <Text>Комментарий</Text>
                                <Text>{review.comment}</Text>
                            </FlexContainer>
                        </FlexContainer>
                    ))
            }
        </FlexContainer>
    );
});
