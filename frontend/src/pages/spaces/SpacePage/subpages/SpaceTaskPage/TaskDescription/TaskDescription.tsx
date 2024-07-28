import { FC, useMemo } from 'react';

import { ExampleType } from '@entities/example/common';
import { useGetIssueExamples } from '@entities/example/issue-example';
import { GetIssueResponse } from '@entities/issue';
import { useGetIssueFormList } from '@entities/issue/lib/useGetIssueFormList';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';

import { useListFilters } from '@shared/hooks';
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
    const [filters] = useListFilters({ count: 15, page: 0 });

    const { data: formList } = useGetIssueFormList(issue.id);

    const { data: examples } = useGetIssueExamples(issue.id, filters);
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
                    onSubmit={console.log}
                    disabled={true}
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
