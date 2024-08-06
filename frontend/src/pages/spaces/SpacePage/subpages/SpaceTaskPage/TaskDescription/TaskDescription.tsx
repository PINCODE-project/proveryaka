import * as constants from 'constants';

import { isAxiosError } from 'axios';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { NavLink } from 'react-router-dom';

import { SpaceRouter } from '@pages/spaces';

import { useCreateSolution } from '@features/solution/create-solution/lib/useCreateSolution';

import { ExampleType } from '@entities/example/common';
import { useGetIssueExamples } from '@entities/example/issue-example';
import { GetIssueResponse } from '@entities/issue';
import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';
import { getStudentIssueSolutionQueryKey } from '@entities/solution/lib/getStudentIssueSolutionQueryKey';
import { useGetExpertSolution } from '@entities/solution/lib/useGetExpertSolution';
import { useGetSolution } from '@entities/solution/lib/useGetSolution';
import { useGetStudentIssueSolution } from '@entities/solution/lib/useGetStudentIssueSolution';
import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionValue } from '@entities/solution/model/GetSolutionValue';
import { useRolesCheck } from '@entities/space/lib/useRolesCheck';
import { useGetSpaceUserTeams } from '@entities/team/lib/useGetSpaceUserTeams';

import { createFile } from '@shared/api/file/solution/createFile';
import { getFile } from '@shared/api/file/solution/getFile';
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

    const { isOrganizer, isStudent, isExpert } = useRolesCheck();

    const { data: issueSolution, error: solutionError } = useGetStudentIssueSolution(issue.id, {
        enabled: isStudent,
        onError: error => {
            if (isAxiosError(error) && error.response?.status === 404) {
                return;
            }
            throw error;
        },
        useErrorBoundary: false,
    });
    const { data: rawSolution } = useGetSolution(issueSolution?.id ?? '', {
        enabled: Boolean(issueSolution),
    });
    const [solution, setSolution] = useState<GetSolution | null>(null);

    useEffect(() => {
        if (!rawSolution) {
            return;
        }
        (async () => {
            const solutionValueList = await Promise.all((rawSolution.solutionValueList ?? []).map(async item => {
                const blob = item.fileIdList?.[0] ? await getFile(item.fileIdList?.[0] ?? '') : null;
                return {
                    ...item,
                    file: blob ? new File([blob], 'file.docx') : null,
                };
            }));

            setSolution({
                ...rawSolution,
                solutionValueList: solutionValueList ?? [],
            });
        })();
    }, [rawSolution]);

    const [teamsFilters] = useListFilters();
    const { data: teams } = useGetSpaceUserTeams(spaceId ?? '', teamsFilters, {
        enabled: isStudent,
    });
    const { mutate: createSolution } = useCreateSolution({
        onSuccess: () => {
            queryClient.resetQueries(getStudentIssueSolutionQueryKey(issue.id));
        },
    });

    const onSubmitSolution = useCallback(async (list: Omit<GetSolutionValue, 'id'>[]) => {
        const solutionValueList = await Promise.all(
            list.map(async form => {
                const fileId = (form as any).file ? (await createFile((form as any).file)).id : null;
                return ({
                    textValue: form.textValue ?? null,
                    fileIdList: fileId ? [fileId] : [],
                    issueFormId: form.issueFormId,
                });
            }));

        createSolution({
            issueId: issue.id,
            data: {
                teamId: teams?.teamList[0]?.id ?? '',
                issueId: issue.id,
                solutionValueList,
            },
        });
    }, [issue, teams, createSolution]);

    const [exampleFilters] = useListFilters();
    const { data: examples } = useGetIssueExamples(issue.id, exampleFilters);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.AntiExample) ?? [], [examples]);

    return (
        <FlexContainer
            direction="column"
            gap="m"
            alignItems="stretch"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="column">
                <Text className={getBemClasses(styles, 'subtitle')}>
                   Описание
                </Text>
                <Text className={getBemClasses(styles, 'desc')}>
                    {issue.description}
                </Text>
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="s"
                style={{ marginBottom: '10px' }}
            >
                <SolutionExample
                    example={standardExamples}
                    antiExample={antiExamples}
                    triggerComponent={open =>
                        (<Button
                            color="primary"
                            onClick={open}
                        >
                            Примеры работ
                        </Button>)}
                />
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="xs"
            >
                <Text className={getBemClasses(styles, 'subtitle')}>Форма сдачи</Text>

                {(isOrganizer || isExpert) || Boolean(solution) || teams?.teamList[0]
                    ? <IssueFormList
                        className={getBemClasses(styles, 'form')}
                        issueId={issue.id}
                        form={solution?.solutionValueList ?? undefined}
                        onSubmit={onSubmitSolution}
                        disabled={isOrganizer || Boolean(solution) || !teams?.teamList[0]}
                        submitButton={handleSubmit => (
                            <Button onClick={handleSubmit}>
                                Сдать
                            </Button>
                        )}
                    />
                    : <FlexContainer direction="column" gap="m">
                        <Text className={getBemClasses(styles, 'teamWarn')}>
                            Для сдачи решения необходимо вступить в команду или создать ее
                        </Text>

                        <NavLink to={SpaceRouter.Team(spaceId ?? '')}>
                            <Button>
                            К командам
                            </Button>
                        </NavLink>
                    </FlexContainer>
                }

            </FlexContainer>
        </FlexContainer>
    );
});
