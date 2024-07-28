import { isAxiosError } from 'axios';
import { FC, useCallback, useMemo } from 'react';
import { useQueryClient } from 'react-query';

import { useCreateSolution } from '@features/solution/create-solution/lib/useCreateSolution';

import { ExampleType } from '@entities/example/common';
import { useGetIssueExamples } from '@entities/example/issue-example';
import { GetIssueResponse } from '@entities/issue';
import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { useGetSpaceUserTeams } from '@entities/team/lib/useGetSpaceUserTeams';

import { useListFilters } from '@shared/hooks';
import { useSpaceId } from '@shared/hooks/useSpaceId';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, Input, SolutionExample, Text } from '@shared/ui';

import styles from './TaskDescription.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    issue: GetIssueResponse;
}>;

export const TaskDescription: FC<Props> = typedMemo(function TaskDescription({
    className,
    issue,
    'data-testid': dataTestId = 'TaskDescription',
}) {
    const queryClient = useQueryClient();
    const spaceId = useSpaceId();

    const { isOrganizer, isStudent } = useRolesCheck();

    const { data: solution, error: solutionError } = useGetStudentIssueSolution(issue.id, {
        enabled: isStudent,
        onError: error => {
            if (isAxiosError(error) && error.response?.status === 404) {
                return;
            }
            throw error;
        },
        useErrorBoundary: false,
    });
    const [teamsFilters] = useListFilters({ page: 0, count: 15 });
    const { data: teams } = useGetSpaceUserTeams(spaceId ?? '', teamsFilters, {
        enabled: isStudent,
    });
    const { mutate: createSolution } = useCreateSolution({
        onSuccess: () => {
            queryClient.resetQueries(getStudentIssueSolutionQueryKey(issue.id));
        },
    });

    const onSubmitSolution = useCallback((form: GetSolutionValue[]) => {
        createSolution({
            issueId: issue.id,
            data: {
                teamId: teams?.teamList[0]?.id ?? '',
                issueId: issue.id,
                solutionValueList: form,
            },
        });
    }, [issue, teams, createSolution]);

    const [exampleFilters] = useListFilters({ count: 15, page: 0 });
    const { data: examples } = useGetIssueExamples(issue.id, exampleFilters);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.AntiExample) ?? [], [examples]);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <Text>
                {issue.description}
            </Text>

            <FlexContainer
                direction="column"
                gap="s"
            >
                <Text>Форма сдачи</Text>

                <IssueFormList
                    issueId={issue.id}
                    onSubmit={onSubmitSolution}
                    disabled={isOrganizer || solutionError !== null}
                    submitButton={handleSubmit => (
                        isOrganizer || solutionError !== null
                            ? null
                            : <Button onClick={handleSubmit}>
                            Сдать
                            </Button>
                    )}
                />
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="s"
            >
                <SolutionExample
                    example={standardExamples}
                    antiExample={antiExamples}
                    triggerComponent={open =>
                        (<Button
                            variant="ghost"
                            color="primary"
                            onClick={open}
                        >
                            Примеры работ
                        </Button>)}
                />
            </FlexContainer>
        </FlexContainer>
    );
});
