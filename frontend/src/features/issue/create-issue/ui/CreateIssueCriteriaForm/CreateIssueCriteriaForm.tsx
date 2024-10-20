import { DeleteOutlined, DownOutlined, PlusCircleOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, Input, InputNumber, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { HelpInfo } from '@shared/ui/HelpInfo';

import styles from './CreateIssueCriteriaForm.module.css';
import { CreateIssueCriteriaDraftRequest } from '../../model/CreateIssueCriteriaDraftRequest';
import { CreateIssueCriteriaExampleDraftRequest } from '../../model/CreateIssueCriteriaExampleDraftRequest';
import { CreateIssueMaterialDraftRequest } from '../../model/CreateIssueMaterialDraftRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    criteria: CreateIssueCriteriaDraftRequest[];
    setCriteria: Dispatch<SetStateAction<CreateIssueCriteriaDraftRequest[]>>;
}>;

export const CreateIssueCriteriaForm: FC<Props> = typedMemo(function CreateIssueMaterialsForm({
    criteria,
    setCriteria,
}) {
    console.log('criteria', criteria);
    const handleAddNewCriteria = useCallback(() => {
        setCriteria([...criteria,
            {
                id: uuid(),
                name: '',
                description: '',
                minScore: 0,
                maxScore: 0,
                weight: 0,
                examples: [],
            },
        ]);
    }, [criteria, setCriteria]);

    const handleAddNewCriteriaExample = useCallback((criteriaID: string) => {
        const changingCrit = criteria.find(crit => crit.id === criteriaID);
        setCriteria([...criteria.map(crit => crit.id === criteriaID
            ? {
                ...crit,
                examples: [...changingCrit!.examples, {
                    id: uuid(),
                    exampleType: 0,
                    description: '',
                }],
            }
            : crit),
        ] as CreateIssueCriteriaDraftRequest[]);
    }, [criteria, setCriteria]);

    const handleChangeCriteria = (id: string, field: string, value: any) => {
        setCriteria(criteria.map(
            crit => crit.id === id
                ? { ...criteria.find(crit => crit.id === id), [field]: value }
                : crit,
        ) as CreateIssueCriteriaDraftRequest[]);
    };

    const handleChangeCriteriaExample = (criteriaId: string, exampleId: string, field: string, value: any) => {
        const crit = criteria.find(crit => crit.id === criteriaId);
        const example = crit!.examples.find(example => example.id === exampleId);

        setCriteria(criteria.map(
            crit => (crit.id === criteriaId
                ? {
                    ...crit,
                    examples: [...crit.examples.map(
                        (critExample: CreateIssueCriteriaExampleDraftRequest) => critExample.id === exampleId
                            ? {
                                ...example,
                                [field]: value,
                            }
                            : critExample)],
                }
                : crit) as CreateIssueCriteriaDraftRequest,
        ));
    };

    const getCriteriaButtons = (index: number) => {
        const handleDeleteCriteria = () => {
            const newCriteria = [...criteria];
            newCriteria.splice(index, 1);
            setCriteria(newCriteria);
        };

        const handleMoveCriteria = (oldIndex: number, newIndex: number) => {
            const newCriteria = [...criteria];
            [newCriteria[oldIndex], [newCriteria[newIndex]]] = [newCriteria[newIndex], [newCriteria[oldIndex]]];
            setCriteria(newCriteria);
        };

        return (
            <Flex gap="middle">
                <Flex>
                    {
                        index !== criteria.length - 1 &&
                        <Button
                            icon={<DownOutlined />}
                            type="text"
                            onClick={e => {
                                e.stopPropagation();
                                handleMoveCriteria(index, index + 1);
                            }}
                        />
                    }
                    {
                        index !== 0 &&
                        <Button
                            icon={<UpOutlined />}
                            type="text"
                            onClick={e => {
                                e.stopPropagation();
                                handleMoveCriteria(index, index - 1);
                            }}
                        />
                    }
                </Flex>
                <Button
                    icon={
                        <DeleteOutlined
                            className={getModuleClasses(styles, 'icon')}
                            style={{ color: '#FF4D4F' }}
                        />
                    }
                    type="text"
                    color="danger"
                    onClick={handleDeleteCriteria}
                />
            </Flex>
        );
    };

    const getCriteriaExampleForm = (
        crit: CreateIssueCriteriaDraftRequest,
        example: CreateIssueCriteriaExampleDraftRequest,
        index: number,
    ) => {
        return (
            <Form
                style={{ maxWidth: 580 }}
                name={`CreateIssueCriteriaExample${example.id}`}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    description: example.description,
                    exampleType: example.exampleType,
                }}
            >
                <Flex vertical gap={28}>
                    <Flex vertical gap={8}>
                        <Typography className={getModuleClasses(styles, 'formItemTitle')}>
                            Пример {index + 1}
                        </Typography>
                        <Flex gap={32}>
                            <Form.Item<CreateIssueCriteriaExampleDraftRequest>
                                className={getModuleClasses(styles, 'formItem')}
                                name="exampleType"
                            >
                                <Select
                                    style={{ width: '200px !important' }}
                                    placeholder="Тип примера"
                                    options={[
                                        { value: 0, label: 'Эталон' },
                                        { value: 1, label: 'Антипример' },
                                    ]}
                                    onChange={value => {
                                        handleChangeCriteriaExample(crit.id, example.id, 'exampleType', value);
                                    }}
                                />
                            </Form.Item>
                        </Flex>
                    </Flex>
                    <Form.Item<CreateIssueCriteriaExampleDraftRequest>
                        className={getModuleClasses(styles, 'formItem')}
                        label="Описание"
                        name="description"
                        rules={[
                            { max: 256, message: 'Не больше 256 символов' },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Введите текст..."
                            maxLength={256}
                            showCount
                            onChange={event => {
                                handleChangeCriteriaExample(crit.id, example.id, 'description', event.target.value);
                            }}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        );
    };

    const getCriteriaForm = (crit: CreateIssueCriteriaDraftRequest) => {
        console.log(crit);
        return (
            <Form
                style={{ maxWidth: 922 }}
                name={`CreateIssueCriteria${crit.id}`}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    name: crit.name,
                    description: crit.description,
                    weight: crit.weight,
                    maxScore: crit.maxScore,
                    minScore: crit.minScore,
                }}
            >
                <Flex vertical gap={32}>
                    <Flex vertical gap={28}>
                        <Flex gap={75}>
                            <Form.Item<CreateIssueCriteriaDraftRequest>
                                style={{ width: 580 }}
                                className={getModuleClasses(styles, 'formItem')}
                                label="Название"
                                name="name"
                                rules={[
                                    { required: true, message: 'Введите название' },
                                    { max: 64, message: 'Не больше 64 символов' },
                                ]}
                            >
                                <Input
                                    placeholder="Введите название..."
                                    showCount
                                    maxLength={64}
                                    onChange={event => {
                                        handleChangeCriteria(crit.id, 'name', event.target.value);
                                    }}
                                />
                            </Form.Item>

                            <Flex vertical gap={0}>
                                <Flex gap={12} align="center" style={{ paddingBottom: '8px' }}>
                                    <Typography.Text className={getModuleClasses(styles, 'formItemTitle')}>
                                        Вес
                                    </Typography.Text>
                                    <HelpInfo
                                        width={450}
                                        title={
                                            'Оценка за критерий будет переведена в 100-балльную шкалу. ' +
                                            'Эта оценка  умножается на вес критерия. ' +
                                            'Веса всех критериев должны в сумме давать  100'
                                        }
                                    />
                                </Flex>
                                <Form.Item
                                    className={getModuleClasses(styles, 'formItem')}
                                    name="weight"
                                    rules={[{ required: true, message: 'Введите вес' }]}
                                >

                                    <InputNumber
                                        min={0}
                                        placeholder="0"
                                        onChange={value => {
                                            handleChangeCriteria(crit.id, 'weight', value);
                                        }}
                                    />
                                </Form.Item>
                            </Flex>
                        </Flex>

                        <Flex gap={75}>
                            <Flex vertical gap={0}>
                                <Flex gap={12} align="center" style={{ paddingBottom: '8px' }}>
                                    <Typography.Text className={getModuleClasses(styles, 'formItemTitle')}>
                                        Описание
                                    </Typography.Text>
                                    <HelpInfo
                                        width={470}
                                        title={'Напишите, каким образом стоит выставлять оценку за критерий.'}
                                    />
                                </Flex>

                                <Form.Item<CreateIssueMaterialDraftRequest>
                                    style={{ width: 580 }}
                                    className={getModuleClasses(styles, 'formItem')}
                                    name="description"
                                    rules={[
                                        { max: 256, message: 'Не больше 256 символов' },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder="Введите текст..."
                                        maxLength={256}
                                        showCount
                                        onChange={event => {
                                            handleChangeCriteria(crit.id, 'description', event.target.value);
                                        }}
                                    />
                                </Form.Item>
                            </Flex>

                            <Form.Item
                                className={getModuleClasses(styles, 'formItem')}

                            >
                                <Flex gap={12} align="center" style={{ paddingBottom: '8px' }}>
                                    <Typography.Text className={getModuleClasses(styles, 'formItemTitle')}>
                                        Оценка
                                    </Typography.Text>
                                    <HelpInfo
                                        width={470}
                                        title={
                                            'Оценка за критерий в баллах, которую будет выставлять студент. ' +
                                            'Необязательно делать её по 100-балльной шкале.'
                                        }
                                    />
                                </Flex>
                                <Flex gap={10} align="center">
                                    От
                                    <Form.Item<CreateIssueCriteriaDraftRequest>
                                        className={getModuleClasses(styles, 'formItem')}
                                        name="minScore"
                                    >
                                        <InputNumber
                                            placeholder="0"
                                            onChange={value => {
                                                handleChangeCriteria(crit.id, 'minScore', value);
                                            }}
                                        />
                                    </Form.Item>
                                    до
                                    <Form.Item<CreateIssueCriteriaDraftRequest>
                                        className={getModuleClasses(styles, 'formItem')}
                                        name="maxScore"
                                    >
                                        <InputNumber
                                            placeholder="0"
                                            onChange={value => {
                                                handleChangeCriteria(crit.id, 'maxScore', value);
                                            }}
                                        />
                                    </Form.Item>
                                </Flex>
                            </Form.Item>
                        </Flex>
                    </Flex>

                    <Flex vertical gap={32}>
                        {crit.examples.map((example, index) => getCriteriaExampleForm(crit, example, index))}
                        <Button
                            style={{ width: '200px' }}
                            onClick={() => handleAddNewCriteriaExample(crit.id)}
                            icon={<PlusOutlined />}
                        >
                            Добавить пример
                        </Button>
                    </Flex>
                </Flex>
            </Form>
        );
    };

    const criteriaToItems = (criteria: CreateIssueCriteriaDraftRequest[]) => {
        return criteria.map((crit, index) => ({
            key: `criteria${crit.id}`,
            children: getCriteriaForm(crit),
            extra: getCriteriaButtons(index),
            label: (
                <Typography.Title level={5} style={{ margin: 0 }}>
                    Критерий {index + 1} {crit.id}
                </Typography.Title>
            ),
        }));
    };

    return (
        <Flex vertical gap="large">
            {
                criteria.length > 0 &&
                <Collapse defaultActiveKey={['1']} items={criteriaToItems(criteria)} />
            }
            <Button icon={<PlusCircleOutlined />} type="primary" onClick={handleAddNewCriteria}>
                Добавить критерий
            </Button>
        </Flex>
    );
});
