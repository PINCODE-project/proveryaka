import { Card, Flex, Form, FormInstance, Input, Typography } from 'antd';
import { FC } from 'react';

import { GetCriteriaWithExamplesResponse } from '@entities/criteria/model/GetCriteriaWithExamplesResponse';
import { GetSolutionForExpert } from '@entities/solution';

import { getModuleClasses, typedMemo } from '@shared/lib';

import styles from './ReviewSolutionMenu.module.css';
import { ReviewSolutionCriteriaForm } from '../ReviewSolutionCriteriaForm/ReviewSolutionCriteriaForm';

type Props = {
    solution: GetSolutionForExpert;
    criteria: GetCriteriaWithExamplesResponse[];
    form: FormInstance;
    hasError: boolean;
};

export const ReviewSolutionMenu: FC<Props> = typedMemo(function ReviewSolutionMenu({
    solution,
    criteria,
    form,
    hasError,
}) {
    const reviews = Form.useWatch('reviewsByCriteria', form);

    const calculateTotalScore = (values: any) => {
        const weightedScores: number[] = values.map((value: any) => {
            const normalizedScore = (((value.scoreCount || 0) - value.minScore) / (value.maxScore - value.minScore)) * 100;
            return normalizedScore * value.weight;
        });

        const totalWeight = values.reduce((sum: number, value: any) => sum + value.weight, 0);
        return weightedScores.reduce((sum: number, score: number) => sum + score, 0) / totalWeight;
    };

    const score = reviews ? calculateTotalScore(reviews) : 0;

    return (
        <Card className={styles.container}>
            {
                solution && criteria
                    ? <Form
                        form={form}
                        name="review_form"
                        layout="vertical"
                        requiredMark={false}
                        initialValues={{
                            reviewsByCriteria: criteria.map(crit => ({ ...crit, comment: '', scoreCount: undefined })),
                            comment: undefined,
                        }}
                    >
                        <Flex vertical gap={24}>
                            <Flex gap={10}>
                                <Typography>Итоговая оценка: </Typography>
                                <Typography>{Math.floor((score || 0) * 100) / 100}/100</Typography>
                            </Flex>

                            <Form.List name="reviewsByCriteria">
                                {
                                    fields => (
                                        <Flex vertical gap={8}>
                                            {
                                                fields.length
                                                    ? fields.map(({ key, ...restField }, index) => {
                                                        return (
                                                            <ReviewSolutionCriteriaForm
                                                                criteria={criteria[key]}
                                                                key={`criteriaForm${key}`}
                                                                index={index + 1}
                                                                restField={restField}
                                                                form={form}
                                                                hasError={hasError}
                                                            />
                                                        );
                                                    })
                                                    : null
                                            }
                                        </Flex>
                                    )
                                }
                            </Form.List>

                            <Form.Item
                                className={getModuleClasses(styles, 'formItem')}
                                label="Общий комментарий"
                                name='comment'
                                rules={[
                                    { required: true, message: 'Общий комментарий - обязательный!' },
                                    { max: 2047, message: 'Не больше 2047 символов' },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Введите текст..."
                                    style={{ resize: 'vertical' }}
                                    showCount
                                    maxLength={2047}
                                />
                            </Form.Item>
                        </Flex>
                    </Form>
                    : null
            }
        </Card>
    );
});
