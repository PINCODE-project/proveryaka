import { Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Formik } from 'formik';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useCreateReview } from '@features/solution/create-review/lib/useCreateReview';
import { CriteriaReview } from '@features/solution/create-review/model/CriteriaReview';
import { CriteriaForm } from '@features/solution/create-review/ui/CreateReviewForm/CriteriaForm';

import { GetCriteriaResponse } from '@entities/criteria';
import { ExampleType } from '@entities/example/common';
import { useGetIssueExamples } from '@entities/example/issue-example';
import { GetIssueResponse } from '@entities/issue';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';
import { useGetExpertSolution } from '@entities/solution/lib/useGetExpertSolution';
import { useGetSolution } from '@entities/solution/lib/useGetSolution';
import { GetSolution } from '@entities/solution/model/GetSolution';
import { GetSolutionForExpert } from '@entities/solution/model/GetSolutionForExpert';

import { getFile } from '@shared/api/file/solution/getFile';
import { useListFilters } from '@shared/hooks';
import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, NavTab, SolutionExample, Text, Textarea } from '@shared/ui';

import styles from './CreateReviewForm.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: GetCriteriaResponse[];
    issue: GetIssueResponse;
    solutionId: string;
}>;

enum SolutionTab {
    Solution,
    Comment,
    Description
}

export const CreateReviewForm: FC<Props> = typedMemo(function CreateReviewForm({
    className,
    criteria,
    solutionId,
    issue,
    'data-testid': dataTestId = 'CreateReviewForm',
}) {
    const queryClient = useQueryClient();
    const { data: rawSolution } = useGetExpertSolution(solutionId);
    const [solution, setSolution] = useState<GetSolutionForExpert | null>(null);

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

    const [currentTab, setCurrentTab] = useState(SolutionTab.Solution);
    const [currentCriteriaOrder, setCurrentCriteriaOrder] = useState<number | null>(null);
    const { mutate: review } = useCreateReview({
        onSuccess: () => {
            queryClient.resetQueries(['solution-reviews/get', solutionId]);
            toast.success('Работа оценена');
        },
        onSettled: () => {
            queryClient.resetQueries(['solution-reviews/get', solutionId]);
        },
    });

    const [exampleFilters] = useListFilters();
    const { data: examples } = useGetIssueExamples(issue.id, exampleFilters);
    const standardExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.Standard) ?? [], [examples]);
    const antiExamples = useMemo(() => examples?.entityList
        ?.filter(example => example.exampleType === ExampleType.AntiExample) ?? [], [examples]);

    const initialValue = useMemo((): CriteriaReview => ({
        solutionId,
        comment: '',
        likeType: 0,
        reviewsByCriteria: criteria.map(item => ({
            scoreCount: null,
            comment: '',
            criteriaId: item.id,
        })),
    }), [solutionId, criteria]);

    const validationSchema = useMemo(() => {
        return Yup.object({
            comment: Yup.string().required('Введите общий комментарий'),
            // @ts-ignore
            reviewsByCriteria: Yup.tuple(criteria.map(item => Yup.object({
                scoreCount: Yup.number()
                    .nullable(`Введите оценку от ${item.minScore} до ${item.maxScore}`)
                    .required(`Введите оценку от ${item.minScore} до ${item.maxScore}`)
                    .min(item.minScore, `Введите оценку от ${item.minScore} до ${item.maxScore}`)
                    .max(item.maxScore, `Введите оценку от ${item.minScore} до ${item.maxScore}`),
                comment: Yup.string().max(2047, 'Максимальная длина текста: 256'),
            }))),
        });
    }, [criteria]);

    const getMark = useCallback((form: CriteriaReview) => {
        let mark = 0;

        for (let i = 0; i < criteria.length; i++) {
            mark += (form.reviewsByCriteria[i]?.scoreCount ?? 0) / (criteria[i].maxScore) * criteria[i].weight;
        }

        return Math.min(Math.floor(mark * 100), 100);
    }, [criteria]);

    const maxMark = useMemo(() => {
        let mark = 0;

        for (let i = 0; i < criteria.length; i++) {
            mark += criteria[i].weight;
        }

        return Math.min(Math.floor(mark * 100), 100);
    }, [criteria]);

    return (
        <Formik initialValues={initialValue} onSubmit={review} validationSchema={validationSchema}>
            {({ handleSubmit, values, errors, isValid }) => {
                return (
                    <div
                        className={getBemClasses(styles, null, null, className)}
                        data-testid={dataTestId}
                    >
                        <FlexContainer direction="column" gap="l" alignItems="stretch">
                            <FlexContainer direction="row" gap="s">
                                <NavTab
                                    name="Задание"
                                    isActive={currentTab === SolutionTab.Description}
                                    onClick={() => setCurrentTab(SolutionTab.Description)}
                                />
                                <NavTab
                                    name="Работа"
                                    isActive={currentTab === SolutionTab.Solution}
                                    onClick={() => setCurrentTab(SolutionTab.Solution)}
                                />
                                <NavTab
                                    name="Общий комментарий"
                                    isActive={currentTab === SolutionTab.Comment}
                                    onClick={() => setCurrentTab(SolutionTab.Comment)}
                                    className={getBemClasses(styles, 'tab', { invalid: Boolean(errors.comment) })}
                                />
                            </FlexContainer>

                            {
                                currentTab === SolutionTab.Solution
                                    ? <IssueFormList
                                        issueId={issue.id}
                                        disabled
                                        form={solution?.solutionValueList ?? []}
                                        onSubmit={() => {
                                        }}
                                    />
                                    : currentTab === SolutionTab.Comment
                                        ? <FormField<string>
                                            name="comment"
                                            content={
                                                ({ onChange, value, isInvalid }) => (
                                                    <TextArea
                                                        maxLength={2047}
                                                        showCount
                                                        variant="filled"
                                                        status={isInvalid ? 'error' : undefined}
                                                        value={value}
                                                        onChange={event => onChange(event.target.value)}
                                                        onBlur={event => onChange(event.target.value.trim())}
                                                    />
                                                )
                                            }
                                        />
                                        : <FlexContainer
                                            direction="column"
                                            gap="m"
                                            alignItems="stretch"
                                            className={getBemClasses(styles, 'content')}
                                            data-testid={dataTestId}
                                        >
                                            <FlexContainer direction="column">
                                                <Text className={getBemClasses(styles, 'subtitle')}>
                                                    Описание
                                                </Text>
                                                <Text>
                                                    {issue.description}
                                                </Text>
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
                                                            color="primary"
                                                            onClick={open}
                                                        >
                                                            Примеры работ
                                                        </Button>)}
                                                />
                                            </FlexContainer>
                                        </FlexContainer>
                            }
                        </FlexContainer>

                        <FlexContainer direction="column" gap="m" overflow="nowrap"
                            alignItems="stretch"
                        >
                            <FlexContainer direction="row" gap="m" justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography className={getBemClasses(styles, 'mark')}>
                                    Итоговая оценка: {getMark(values)}/{maxMark}
                                </Typography>

                                <Button
                                    onClick={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    Оценить
                                </Button>
                            </FlexContainer>

                            <FlexContainer
                                overflow="nowrap"
                                direction="column"
                                gap="s"
                                className={getBemClasses(styles, 'criteriaScroll')}
                            >
                                {criteria.map((item, order) => (
                                    <CriteriaForm
                                        key={item.id}
                                        order={order}
                                        onSelect={setCurrentCriteriaOrder}
                                        isOpen={order === currentCriteriaOrder}
                                        criteria={item}
                                    />
                                ))}
                            </FlexContainer>
                        </FlexContainer>
                    </div>
                );
            }}
        </Formik>
    );
});
