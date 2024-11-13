import { Card, Flex, Form, FormInstance, Input, Typography } from 'antd';
import { FC } from 'react';

import {
    ReviewSolutionCriteriaForm,
} from '@pages/space/SpaceReviewSolutionPage/ReviewSolutionCriteriaForm/ReviewSolutionCriteriaForm';

import { GetCriteriaWithExamplesResponse } from '@entities/criteria/model/GetCriteriaWithExamplesResponse';

import { getModuleClasses, typedMemo } from '@shared/lib';

import styles from './ReviewSolutionMenu.module.css';

type Props = {
    solution: any;
    criteria: GetCriteriaWithExamplesResponse[];
    form: FormInstance;
    setCriteriaId: any;
    // examples: any;
};

export const ReviewSolutionMenu: FC<Props> = typedMemo(function ReviewSolutionMenu({
    solution,
    criteria,
    form,
    setCriteriaId,
}) {
    console.log(criteria);
    return (
        <Card className={styles.container}>
            {
                solution && criteria
                    ? <Form
                        form={form}
                        name="review_form"
                        layout="vertical"
                        requiredMark={false}
                        initialValues={{ reviewsByCriteria: criteria }}
                    >
                        <Flex vertical gap={24}>
                            <Flex gap={10}>
                                <Typography>Итоговая оценка: </Typography>
                                <Typography>0/100</Typography>
                            </Flex>

                            <Form.List name="reviewsByCriteria">
                                {
                                    fields => (
                                        <Flex vertical gap={8}>
                                            {
                                                fields.length
                                                    ? fields.map(({ key, name, ...restField }, index) => {
                                                        return (<ReviewSolutionCriteriaForm
                                                            criteria={criteria[key]}
                                                            key={`criteriaForm${key}`}
                                                            index={index + 1}
                                                            restField={restField}
                                                            setCriteriaId={setCriteriaId}
                                                        />);
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
                                name={'comment'}
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
