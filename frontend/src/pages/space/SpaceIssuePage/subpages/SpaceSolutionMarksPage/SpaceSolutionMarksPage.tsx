import { FC, useCallback } from 'react';

import { SolutionMarksTable, GetReviews } from '@entities/solution';
import { useRolesCheck } from '@entities/space';

import { useSolutionId } from '@shared/hooks/useSolutionId';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SpaceSolutionMarksPage: FC<Props> = typedMemo(function SpaceSolutionMarksPage({

}) {
    const { isOrganizer } = useRolesCheck();
    const solutionId = useSolutionId();
    const actionRender = useCallback((_: string, record: GetReviews) => 'Feedback', []);

    return (
        <SolutionMarksTable
            solutionId={solutionId ?? ''}
            actionRender={actionRender}
            placeholder="Вы еще не оценили работу"
            canChangeMarkType={isOrganizer}
        />
    );
});
