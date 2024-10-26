import { DeleteOutlined, DownOutlined, PlusCircleOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import {
    Button,
    Collapse,
    Flex,
    Form,
    FormInstance,
    FormListOperation,
    Input,
    InputNumber,
    Select,
    Typography,
} from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput } from '@shared/ui';
import { HelpInfo } from '@shared/ui/HelpInfo';

import styles from './CreateIssueCriteriaForm.module.css';
import { CreateIssueCriteriaDraftRequest } from '../../model/CreateIssueCriteriaDraftRequest';
import { CreateIssueCriteriaExampleDraftRequest } from '../../model/CreateIssueCriteriaExampleDraftRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    form: FormInstance;
    criteria: CreateIssueCriteriaDraftRequest[];
    setCriteria: Dispatch<SetStateAction<CreateIssueCriteriaDraftRequest[]>>;
}>;

export const CreateIssueCriteriaForm: FC<Props> = typedMemo(function CreateIssueMaterialsForm({
    form,
    criteria,
    setCriteria,
}) {
    const handleAddNewCriteria = useCallback((add: FormListOperation['add']) => {
        const initCriteria = {
            id: uuid(),
            name: '',
            description: '',
            minScore: 0,
            maxScore: 0,
            weight: 0,
            examples: [],
        };
        add(initCriteria);
        setCriteria([...criteria, initCriteria]);
    }, [criteria, setCriteria]);

    const handleAddNewCriteriaExample = useCallback((criteriaID: string, add: FormListOperation['add']) => {
        const changingCrit = { ...criteria.find(crit => crit.id === criteriaID) };
        const initExample = {
            id: uuid(),
            exampleType: 1,
            description: '',
            fileIdValue: null,
            file: null,
        };

        setCriteria([...criteria.map(crit => crit.id === criteriaID
            ? {
                ...changingCrit,
                examples: [...changingCrit!.examples!, initExample],
            }
            : crit),
        ] as CreateIssueCriteriaDraftRequest[]);
        add(initExample);
    }, [criteria, setCriteria]);

    const handleChangeCriteria = useCallback(
        (id: string, field: string, value: any) => {
            setCriteria(prevCriteria => prevCriteria.map(
                crit => crit.id === id
                    ? { ...crit, [field]: value }
                    : crit,
            ));
        },
        [setCriteria],
    );

    const handleChangeCriteriaExample = useCallback(
        (criteriaId: string, exampleId: string, field: string, value: any) => {
            setCriteria(prevCriteria => prevCriteria.map(
                crit => (crit.id === criteriaId
                    ? {
                        ...crit,
                        examples: crit.examples.map(
                            (critExample: CreateIssueCriteriaExampleDraftRequest) => critExample.id === exampleId
                                ? {
                                    ...critExample,
                                    [field]: value,
                                }
                                : critExample),
                    }
                    : crit) as CreateIssueCriteriaDraftRequest,
            ));
        },
        [setCriteria],
    );

    const handleMoveCriteria = (move: (from: number, to: number) => void, oldIndex: number, newIndex: number) => {
        move(oldIndex, newIndex);
        const newCriteria = [...criteria];
        [newCriteria[oldIndex], [newCriteria[newIndex]]] = [newCriteria[newIndex], [newCriteria[oldIndex]]];
        setCriteria(newCriteria);
    };

    const handleRemoveCriteriaExample = (criteriaIndex: number, exampleIndex: number, remove: (index: number) => void) => {
        const newCriteria = [...criteria];
        newCriteria[criteriaIndex].examples.splice(exampleIndex, 1);
        setCriteria(newCriteria);
        remove(exampleIndex);
    };

    const getCriteriaButtons = (
        remove: (index: number) => void,
        move: (from: number, to: number) => void,
        index: number,
        length: number,
    ) => {
        const handleRemoveCriteria = () => {
            const newCriteria = [...criteria];
            newCriteria.splice(index, 1);
            setCriteria(newCriteria);
            remove(index);
        };

        return (
            <Flex gap="middle">
                <Flex>
                    {
                        index !== length - 1 &&
                        <Button
                            icon={<DownOutlined />}
                            type="text"
                            onClick={e => {
                                e.stopPropagation();
                                handleMoveCriteria(move, index, index + 1);
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
                                handleMoveCriteria(move, index, index - 1);
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
                    onClick={e => {
                        e.stopPropagation();
                        handleRemoveCriteria();
                    }}
                />
            </Flex>
        );
    };

    const getCriteriaExampleForm = (
        critIndex: number,
        exampleIndex: number,
        restField: {fieldKey?: number | undefined},
        remove: (index: number) => void,
    ) => {
        const crit = { ...criteria[critIndex] } as CreateIssueCriteriaDraftRequest;
        const example = { ...crit.examples[exampleIndex] } as CreateIssueCriteriaExampleDraftRequest;

        return (
            <Flex vertical gap={28}>
                <Flex vertical gap={8}>
                    <Flex align="center" justify="space-between">
                        <Typography className={getModuleClasses(styles, 'formItemTitle')}>
                            Пример {exampleIndex + 1}
                        </Typography>

                        <Button
                            icon={
                                <DeleteOutlined
                                    className={getModuleClasses(styles, 'icon')}
                                    style={{ color: '#FF4D4F' }}
                                />
                            }
                            type="text"
                            color="danger"
                            onClick={() => handleRemoveCriteriaExample(critIndex, exampleIndex, remove)}
                        />
                    </Flex>

                    <Flex gap={32}>
                        <Form.Item
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[exampleIndex, 'exampleType']}
                        >
                            <Select
                                style={{ width: '200px !important' }}
                                placeholder="Тип примера"
                                options={[
                                    { value: 1, label: 'Эталон' },
                                    { value: 2, label: 'Антипример' },
                                ]}
                                onChange={value => {
                                    handleChangeCriteriaExample(crit.id, example.id, 'exampleType', value);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            {...restField}
                            style={{
                                marginTop: example.file === null && example.fileIdValue === null ? '0px' : '-3px',
                            }}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[exampleIndex, 'fileIdValue']}
                            rules={[
                                {
                                    validator: () => {
                                        if (example.fileIdValue || example.file) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Загрузите файл'));
                                    },
                                },
                            ]}
                        >
                            <FileInput
                                isEmpty={example.file === null && example.fileIdValue === null}
                                multiple={false}
                                maxCount={1}
                                defaultFileList={example.file
                                    ? [{
                                        uid: example.file.uid,
                                        name: example.file.name,
                                        status: 'done',
                                    }]
                                    : (
                                        example.fileIdValue
                                            ? [{
                                                uid: 'exampleFile',
                                                name: 'Файл с сервера',
                                                status: 'done',
                                            }]
                                            : undefined
                                    )
                                }
                                listType="text"
                                emptyText="Загрузить файл"
                                onChange={value => {
                                    handleChangeCriteriaExample(
                                        crit.id,
                                        example.id,
                                        'file',
                                        value.file.status !== 'removed' ? value.file.originFileObj : null,
                                    );
                                    if (!value.fileList.length) {
                                        handleChangeCriteriaExample(crit.id, example.id, 'fileIdValue', null);
                                    }
                                }}
                                onRemove={() => {
                                    handleChangeCriteriaExample(crit.id, example.id, 'file', null);
                                    handleChangeCriteriaExample(crit.id, example.id, 'fileIdValue', null);
                                }}
                                isButton={true}
                            />
                        </Form.Item>
                    </Flex>
                </Flex>
                <Form.Item
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    style={{ maxWidth: 580, width: '100%' }}
                    label="Описание"
                    name={[exampleIndex, 'description']}
                    rules={[
                        { max: 2047, message: 'Не больше 256 символов' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Введите текст..."
                        maxLength={2047}
                        showCount
                        style={{ resize: 'vertical' }}
                        onChange={event => {
                            handleChangeCriteriaExample(crit.id, example.id, 'description', event.target.value);
                        }}
                    />
                </Form.Item>
            </Flex>
        );
    };

    const getCriteriaForm = (index: number, restField: {fieldKey?: number | undefined}) => {
        const crit = { ...criteria[index] };

        return (
            <Flex vertical gap={32}>
                <Flex vertical gap={28}>
                    <Flex gap={75}>
                        <Form.Item
                            {...restField}
                            style={{ maxWidth: 580, width: '100%' }}
                            className={getModuleClasses(styles, 'formItem')}
                            label="Название"
                            name={[index, 'name']}
                            rules={[
                                { required: true, message: 'Введите название' },
                                { max: 128, message: 'Не больше 64 символов' },
                            ]}
                        >
                            <Input
                                placeholder="Введите название..."
                                showCount
                                maxLength={128}
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
                                {...restField}
                                className={getModuleClasses(styles, 'formItem')}
                                name={[index, 'weight']}
                                rules={[{ required: true, message: 'Введите вес' }]}
                            >
                                <InputNumber
                                    min={0}
                                    placeholder="0"
                                    suffix="%"
                                    onChange={value => {
                                        handleChangeCriteria(crit.id, 'weight', value);
                                    }}
                                />
                            </Form.Item>
                        </Flex>
                    </Flex>

                    <Flex gap={75}>
                        <Flex vertical gap={0} style={{ maxWidth: 580, width: '100%' }}>
                            <Flex gap={12} align="center" style={{ paddingBottom: '8px' }}>
                                <Typography.Text className={getModuleClasses(styles, 'formItemTitle')}>
                                    Описание
                                </Typography.Text>
                                <HelpInfo
                                    width={470}
                                    title={'Напишите, каким образом стоит выставлять оценку за критерий.'}
                                />
                            </Flex>

                            <Form.Item
                                {...restField}
                                className={getModuleClasses(styles, 'formItem')}
                                name={[index, 'description']}
                                rules={[
                                    { max: 2047, message: 'Не больше 256 символов' },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Введите текст..."
                                    maxLength={2047}
                                    showCount
                                    style={{ resize: 'vertical' }}
                                    onChange={event => {
                                        handleChangeCriteria(crit.id, 'description', event.target.value);
                                    }}
                                />
                            </Form.Item>
                        </Flex>

                        <Form.Item className={getModuleClasses(styles, 'formItem')}>
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
                            <Flex gap={10}>
                                <Typography style={{ lineHeight: '32px' }}>От</Typography>
                                <Form.Item
                                    {...restField}
                                    className={getModuleClasses(styles, 'formItem')}
                                    name={[index, 'minScore']}
                                    rules={[{ required: true, message: 'Введите минимальную оценку' }]}
                                >
                                    <InputNumber
                                        placeholder="0"
                                        onChange={value => {
                                            handleChangeCriteria(crit.id, 'minScore', value);
                                        }}
                                    />
                                </Form.Item>
                                <Typography style={{ lineHeight: '32px' }}>до</Typography>
                                <Form.Item
                                    {...restField}
                                    className={getModuleClasses(styles, 'formItem')}
                                    name={[index, 'maxScore']}
                                    dependencies={[['criteria', index, 'minScore']]}
                                    rules={[
                                        { required: true, message: 'Введите максимальную оценку' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value === null ||
                                                    getFieldValue(['criteria', index, 'minScore']) < value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(
                                                    'Макс. оценка > минимальная!',
                                                ));
                                            },
                                        }),
                                    ]}
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
                    <Form.List name={[index, 'examples']}>
                        {(fields, { add, remove }) => (
                            <Flex vertical gap={32}>
                                {
                                    fields.map(({ name, ...restField }) => {
                                        return (
                                            getCriteriaExampleForm(index, name, restField, remove)
                                        );
                                    })
                                }
                                <Button
                                    style={{ width: '200px' }}
                                    onClick={() => handleAddNewCriteriaExample(crit.id, add)}
                                    icon={<PlusOutlined />}
                                >
                                    Добавить пример
                                </Button>
                            </Flex>
                        )}
                    </Form.List>
                </Flex>
            </Flex>
        );
    };

    return (
        <Form
            form={form}
            name="criteria_form"
            layout="vertical"
            requiredMark={false}
            initialValues={{ criteria }}
        >
            <Form.List name="criteria">
                {(fields, { add, remove, move }) => (
                    <Flex vertical gap={32}>
                        {
                            fields.length
                                ? <Collapse
                                    items={fields.map(({ key, name, ...restField }, index) => {
                                        return ({
                                            key: `criteria${key}`,
                                            label: <Typography.Title level={5} style={{ margin: 0 }}>
                                                    Критерий {index + 1}
                                            </Typography.Title>,
                                            classNames: { header: styles.collapseHeader },
                                            extra: getCriteriaButtons(remove, move, index, fields.length),
                                            children: getCriteriaForm(name, restField),
                                            forceRender: true,
                                        });
                                    })}
                                />
                                : null
                        }

                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            style={{ width: '200px' }}
                            onClick={() => handleAddNewCriteria(add)}
                        >
                            Добавить критерий
                        </Button>
                    </Flex>
                )}
            </Form.List>
        </Form>
    );
});
