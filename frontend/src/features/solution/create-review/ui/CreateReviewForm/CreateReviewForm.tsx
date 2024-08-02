import { Typography } from 'antd';
import { Formik } from 'formik';
import { FC, useMemo, useState } from 'react';
import * as Yup from 'yup';

import { CriteriaReview } from '@features/solution/create-review/model/CriteriaReview';
import { CriteriaForm } from '@features/solution/create-review/ui/CreateReviewForm/CriteriaForm';

import { GetCriteriaResponse } from '@entities/criteria';
import { GetIssueResponse } from '@entities/issue';
import { IssueFormList } from '@entities/issue/ui/IssueFormList';
import { useGetSolution } from '@entities/solution/lib/useGetSolution';

import { getBemClasses, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, NavTab, Textarea } from '@shared/ui';

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
    const { data: solution } = useGetSolution(solutionId);
    const [currentTab, setCurrentTab] = useState(SolutionTab.Solution);
    const [currentCriteriaOrder, setCurrentCriteriaOrder] = useState(0);

    const initialValue = useMemo((): CriteriaReview => ({
        solutionId,
        comment: '',
        reviewsByCriteria: criteria.map(item => ({
            scoreCount: item.minScore,
            comment: '',
            criteriaId: item.id,
        })),
    }), [solutionId, criteria]);

    const validationSchema = useMemo(() => {
        return Yup.object({
            comment: Yup.string().required('Введите общий комментарий'),
            // @ts-ignore
            reviewsByCriteria: Yup.tuple(criteria.map(item => Yup.object({
                scoreCount: Yup.number().min(item.minScore).max(item.maxScore),
                comment: Yup.string(),
            }))),
        });
    }, [criteria]);

    return (
        <Formik initialValues={initialValue} onSubmit={console.log} validationSchema={validationSchema}>
            {({ handleSubmit }) => (
                <div
                    className={getBemClasses(styles, null, null, className)}
                    data-testid={dataTestId}
                >
                    <FlexContainer direction="column" gap="m">
                        <FlexContainer direction="row" gap="s">
                            <NavTab
                                name="Работа"
                                isActive={currentTab === SolutionTab.Solution}
                                onClick={() => setCurrentTab(SolutionTab.Solution)}
                            />
                            <NavTab
                                name="Общий комментарий"
                                isActive={currentTab === SolutionTab.Comment}
                                onClick={() => setCurrentTab(SolutionTab.Comment)}
                            />
                            <NavTab
                                name="Описание"
                                isActive={currentTab === SolutionTab.Description}
                                onClick={() => setCurrentTab(SolutionTab.Description)}
                            />
                        </FlexContainer>

                        {
                            currentTab === SolutionTab.Solution
                                ? <IssueFormList
                                    issueId={issue.id}
                                    disabled
                                    form={solution?.solutionValueList ?? []}
                                    onSubmit={() => {}}
                                />
                                : currentTab === SolutionTab.Comment
                                    ? <FormField<string>
                                        name="comment"
                                        content={
                                            ({ onChange, value }) => (
                                                <Textarea
                                                    value={value}
                                                    onChange={event => onChange(event.target.value)}
                                                    onBlur={event => onChange(event.target.value.trim())}
                                                />
                                            )
                                        }
                                    />
                                    : <Typography>
                                        {issue.description}
                                    </Typography>
                        }
                    </FlexContainer>

                    <FlexContainer direction="column" gap="m">
                        <Typography>Итоговая оценка: -1/-1</Typography>

                        <Button onClick={() => handleSubmit()}>
                            Оценить
                        </Button>

                        <FlexContainer direction="column" gap="s">
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
            )}
        </Formik>
    );
});
