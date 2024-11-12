import { EyeOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, Input, InputNumber, Typography } from 'antd';
import { FC } from 'react';

import { getModuleClasses, typedMemo } from '@shared/lib';

import styles from './ReviewSolutionCriteriaForm.module.css';

type Props = {
    criteria: any;
    index: number;
    restField: any;
    setCriteriaId: any;
};

export const ReviewSolutionCriteriaForm: FC<Props> = typedMemo(function ReviewSolutionCriteriaForm({
    criteria,
    index,
    restField,
    setCriteriaId,
}) {
    if (!criteria) { return; }

    return (
        <Collapse items={[
            {
                key: '1',
                label: `${index}. ${criteria.name}`,
                forceRender: true,
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

                        <Flex gap={6} className={styles.button} onClick={() => setCriteriaId(criteria.id)}>
                            <EyeOutlined />
                            Пример выполнения
                        </Flex>

                        <Form.Item
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[index, 'scoreCount']}
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
                            name={[index, 'comment']}
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
