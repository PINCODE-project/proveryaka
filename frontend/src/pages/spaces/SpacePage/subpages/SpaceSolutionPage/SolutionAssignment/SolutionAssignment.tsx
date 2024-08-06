import { FC, useEffect, useMemo, useState } from 'react';

import { useGetIssue } from '@entities/issue';
import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';
import { useGetExpertSolution } from '@entities/solution/lib/useGetExpertSolution';
import { useGetSolution } from '@entities/solution/lib/useGetSolution';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { getFile } from '@shared/api/file/solution/getFile';
import { useIssueId } from '@shared/hooks';
import { useSolutionId } from '@shared/hooks/useSolutionId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FlexContainer, Input, Text } from '@shared/ui';

import styles from './SolutionAssignment.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SolutionAssignment: FC<Props> = typedMemo(function SolutionAssignment({
    className,
    'data-testid': dataTestId = 'SolutionAssignment',
}) {
    const solutionId = useSolutionId();
    const issueId = useIssueId();
    const { data: rawSolution } = useGetExpertSolution(solutionId ?? '');
    const [solution, setSolution] = useState<GetSolutionForExpert>(rawSolution!);

    useEffect(() => {
        if (!rawSolution) {
            return;
        }

        (async () => {
            const solution = await Promise.all(rawSolution?.solutionValueList
                .map(async item => ({
                    ...item,
                    file: item.fileIdList?.[0] ? await getFile(item.fileIdList?.[0]) : null,
                })));

            setSolution({ ...rawSolution, solutionValueList: solution });
        })();
    }, [rawSolution]);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            alignItems="stretch"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer
                direction="column"
                gap="xs"
            >
                <Text className={getBemClasses(styles, 'subtitle')}>Форма сдачи</Text>
                <IssueFormList
                    className={getBemClasses(styles, 'form')}
                    issueId={issueId ?? ''}
                    form={solution?.solutionValueList ?? []}
                    disabled
                    onSubmit={() => {}}
                />
            </FlexContainer>
        </FlexContainer>
    );
});
