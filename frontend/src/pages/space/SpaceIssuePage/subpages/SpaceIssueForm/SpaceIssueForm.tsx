import { FC, useEffect, useMemo, useState } from 'react';

import { IssueFormsForm } from '@features/solution/create-solution';

import { useGetIssue } from '@entities/issue';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { useGetStudentSolution } from '@entities/solution/lib/useGetStudentSolution';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';

import { getFile } from '@shared/api/file/solution/getFile';
import { useIssueId } from '@shared/hooks';
import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';

export type Props = ClassNameProps & TestProps;

export const SpaceIssueForm: FC<Props> = typedMemo(function SpaceIssueForm() {
    const issueId = useIssueId();

    const { data: issue } = useGetIssue(issueId ?? '');
    const disabled = useMemo(() => issue
        ? new Date(issue.assessmentDeadlineDateUtc ?? 0) < new Date()
        : false, [issue]);

    const { data: studentSolution } = useGetStudentIssueSolution(issueId ?? '');
    const { data: solution } = useGetStudentSolution(studentSolution?.id ?? '', { enabled: Boolean(studentSolution) });
    const [initialData, setInitialData] = useState<GetSolutionValue[] | undefined>(undefined);

    useEffect(() => {
        if (!solution) {
            return;
        }

        (async function() {
            const promises: Promise<void>[] = [];
            solution.solutionValueList?.forEach((item, index) => {
                if (item.fileIdList?.[0]) {
                    promises.push(getFile(item.fileIdList[0]).then(file => {
                        if (solution.solutionValueList) {
                            solution.solutionValueList[index].file = file;
                        }
                    }));
                }
            });

            await Promise.all(promises);

            setInitialData(solution?.solutionValueList ?? []);
        })();
    }, [solution]);

    if (!issueId) {
        return null;
    }
    return (
        <IssueFormsForm
            issueId={issueId ?? ''}
            solutionId={solution?.id}
            initialData={initialData}
            disabled={disabled}
        />
    );
});
