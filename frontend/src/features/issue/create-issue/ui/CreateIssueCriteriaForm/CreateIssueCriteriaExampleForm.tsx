import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import { CreateIssueCriteriaDraftRequest } from '@features/issue/create-issue/model/CreateIssueCriteriaDraftRequest';
import styles from '@features/issue/create-issue/ui/CreateIssueCriteriaForm/CreateIssueCriteriaForm.module.css';

import { getModuleClasses } from '@shared/lib';
import { FileInput } from '@shared/ui';

import { CreateIssueCriteriaExampleDraftRequest } from '../../model/CreateIssueCriteriaExampleDraftRequest';

type Props = {
    criteria: CreateIssueCriteriaDraftRequest[];
    setCriteria: Dispatch<SetStateAction<CreateIssueCriteriaDraftRequest[]>>;
    critIndex: number;
    exampleIndex: number;
    remove: (index: number) => void;
    restField: {fieldKey?: number | undefined};
};

export const CriteriaExampleForm: FC<Props> = ({
    criteria,
    setCriteria,
    critIndex,
    exampleIndex,
    remove,
    restField,
}) => {
    const crit = { ...criteria[critIndex] } as CreateIssueCriteriaDraftRequest;
    const example = { ...crit.examples[exampleIndex] } as CreateIssueCriteriaExampleDraftRequest;

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

    const handleRemoveCriteriaExample = (
        criteriaIndex: number,
        exampleIndex: number,
        remove: (index: number) => void,
    ) => {
        const newCriteria = [...criteria];
        newCriteria[criteriaIndex].examples.splice(exampleIndex, 1);
        setCriteria(newCriteria);
        remove(exampleIndex);
    };

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
