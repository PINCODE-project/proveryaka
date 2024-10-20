import { Flex, Typography } from 'antd';
import { FC, useCallback } from 'react';

import { GetReviews, MarkType, SolutionMarksTable } from '@entities/solution';
import { useGetStudentSolutionReviews } from '@entities/solution/lib/useGetStudentSolutionReviews';
import { useRolesCheck } from '@entities/space';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './SpaceSolutionMarksPage.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionMarksPage: FC<Props> = typedMemo(function SpaceSolutionMarksPage({

}) {
    const { isOrganizer } = useRolesCheck();
    const solutionId = useSolutionId();
    const { data: solution } = useGetStudentSolutionReviews(solutionId ?? '');

    const actionRender = useCallback((_: string, record: GetReviews) => 'Feedback', []);

    return (
        <Flex vertical gap={32}>
            {
                isOrganizer
                    ? null
                    : <Flex vertical gap={24}>
                        <Flex gap={4}>
                            <Typography className={styles.title}>Итоговая оценка:</Typography>
                            <Typography className={styles.mark}>{solution?.reviews[0]?.mark ?? '-'}/100</Typography>
                        </Flex>
                        <Flex vertical gap={8}>
                            <Typography className={styles.title}>Общий комментарий:</Typography>
                            <Typography>{solution?.reviews[0]?.comment ?? '-'}</Typography>
                        </Flex>
                    </Flex>
            }
            <SolutionMarksTable
                solutionId={solutionId ?? ''}
                actionRender={actionRender}
                defaultMarkType={isOrganizer ? MarkType.Common : MarkType.Criteria}
                placeholder="Вы еще не оценили работу"
                canChangeMarkType={isOrganizer}
            />
        </Flex>
    );
});
