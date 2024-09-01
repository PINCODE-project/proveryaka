import { FC } from 'react';

import { ExampleType } from '@entities/example/common';
import { useGetIssueExamples } from '@entities/example/issue-example';
import { useGetIssue } from '@entities/issue';

import { useIssueId } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, SolutionExample, Text } from '@shared/ui';

import styles from './SolutionDescription.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

export const SolutionDescription: FC<Props> = typedMemo(function SolutionDescription({
    className,
    'data-testid': dataTestId = 'SolutionDescription',
}) {
    const issueId = useIssueId();
    const { data: issue } = useGetIssue(issueId ?? '');

    const { data: issueExample } = useGetIssueExamples(issueId ?? '');

    return (
        <FlexContainer
            direction="column"
            gap="m"
            className={getBemClasses(styles, null, null, className)}
            data-testid={dataTestId}
        >
            <FlexContainer direction="column">
                <Text className={getBemClasses(styles, 'subtitle')}>
                    Описание
                </Text>
                <Text>
                    {issue?.description}
                </Text>
            </FlexContainer>

            <FlexContainer
                direction="column"
                gap="s"
            >
                <SolutionExample
                    example={
                        issueExample?.entityList?.filter(example => example.exampleType === ExampleType.Standard) ?? []
                    }
                    antiExample={
                        issueExample?.entityList?.filter(example => example.exampleType === ExampleType.AntiExample) ?? []
                    }
                    triggerComponent={open =>
                        (<Button
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
