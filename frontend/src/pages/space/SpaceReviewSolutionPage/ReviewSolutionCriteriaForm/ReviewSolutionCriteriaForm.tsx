import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Collapse, Flex, Form, FormInstance, Input, InputNumber, Typography } from 'antd';
import { FC } from 'react';

import { CriteriaExampleModal } from '@entities/criteria';
import { GetCriteriaWithExamplesResponse } from '@entities/criteria/model/GetCriteriaWithExamplesResponse';

import { getModuleClasses, typedMemo } from '@shared/lib';

import styles from './ReviewSolutionCriteriaForm.module.css';

type Props = {
    criteria: GetCriteriaWithExamplesResponse;
    index: number;
    restField: { name: number; fieldKey?: number | undefined };
    form: FormInstance;
    hasError: boolean;
};

export const ReviewSolutionCriteriaForm: FC<Props> = typedMemo(function ReviewSolutionCriteriaForm({
    criteria,
    index,
    restField,
    form,
    hasError,
}) {
    const scoreCount = Form.useWatch(['reviewsByCriteria', index - 1, 'scoreCount'], form);

    if (!criteria) {
        return;
    }

    return (
        <Collapse items={[
            {
                key: '1',
                label: `${index}. ${criteria.name}`,
                forceRender: true,
                extra: (
                    scoreCount === undefined || scoreCount === null
                        ? <InfoCircleOutlined style={hasError ? { color: 'red' } : undefined} />
                        : <Typography>{scoreCount}/{criteria.maxScore}</Typography>
                ),
                children: (
                    <Flex vertical gap={24} className={getModuleClasses(styles, 'form')}>
                        <Flex vertical gap={15}>
                            <Flex vertical>
                                <Typography>Вес</Typography>
                                <Typography>{criteria.weight * 100} %</Typography>
                            </Flex>
                            <Flex vertical>
                                <Typography>Описание</Typography>
                                <Typography className={styles.description}>{criteria.description}</Typography>
                            </Flex>
                        </Flex>

                        {
                            criteria.criteriaExampleList.length > 0 &&
                            <CriteriaExampleModal
                                triggerComponent={open => (
                                    <Flex gap={6} className={styles.button} onClick={open}>
                                        <EyeOutlined />
                                        Пример выполнения
                                    </Flex>
                                )}
                                examplesRaw={criteria.criteriaExampleList ?? []}
                            />
                        }

                        <Form.Item
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[index - 1, 'scoreCount']}
                            label={`Оценка от ${criteria.minScore} до ${criteria.maxScore}`}
                            rules={[
                                { required: true, message: 'Введите оценку!' },
                                {
                                    validator: (_, value) => {
                                        if (!value || value >= criteria.minScore) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(`Минимальная оценка ${criteria.minScore}!`));
                                    },
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value || value <= criteria.maxScore) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(`Максимальная оценка ${criteria.maxScore}!`));
                                    },
                                },
                            ]}
                        >
                            <InputNumber min={criteria.minScore} max={criteria.maxScore} placeholder="0" />
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            label="Комментарий"
                            name={[index - 1, 'comment']}
                            rules={[
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
                ),
            },
        ]}
        />
    );
});
