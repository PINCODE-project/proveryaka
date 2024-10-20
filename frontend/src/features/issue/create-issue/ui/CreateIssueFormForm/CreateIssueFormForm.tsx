import { DeleteOutlined, DownOutlined, PlusCircleOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Flex, Form, Input, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { GetIssueFormDraftResponse } from '@entities/issue-draft/model/GetIssueFormDraftResponse';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateIssueFormForm.module.css';
import { CreateIssueFormRequest } from '../../model/CreateIssueFormRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    forms: CreateIssueFormRequest[];
    setForms: Dispatch<SetStateAction<CreateIssueFormRequest[]>>;
}>;

export const CreateIssueFormForm: FC<Props> = typedMemo(function CreateIssueFormForm({
    forms,
    setForms,
}) {
    const handleAddNewIssueForm = useCallback(() => {
        setForms([...forms,
            {
                id: uuid(),
                name: '',
                isRequired: false,
                formSolutionType: 0,
                description: '',
            },
        ]);
    }, [forms, setForms]);

    const handleChangeIssueForm = (id: string, field: string, value: any) => {
        setForms(forms.map(
            form => form.id === id
                ? { ...forms.find(form => form.id === id), [field]: value }
                : form,
        ) as CreateIssueFormRequest[]);
    };

    const getIssueFormButtons = (index: number) => {
        const handleDeleteIssueForm = () => {
            const newForms = [...forms];
            newForms.splice(index, 1);
            setForms(newForms);
        };

        const handleMoveIssueForms = (oldIndex: number, newIndex: number) => {
            const newForms = [...forms];
            [newForms[oldIndex], [newForms[newIndex]]] = [newForms[newIndex], [newForms[oldIndex]]];
            setForms(newForms);
        };

        return (
            <Flex gap="middle">
                <Flex>
                    {
                        index !== forms.length - 1 &&
                        <Button
                            icon={<DownOutlined />}
                            type="text"
                            onClick={e => {
                                e.stopPropagation();
                                handleMoveIssueForms(index, index + 1);
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
                                handleMoveIssueForms(index, index - 1);
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
                    onClick={handleDeleteIssueForm}
                />
            </Flex>
        );
    };

    const getIssueFormForm = (form: GetIssueFormDraftResponse) => {
        return (
            <Form
                className={styles.form}
                name={`CreateIssueForm${form.id}`}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    name: form.name,
                    description: form.description || '',
                    formSolutionType: form.formSolutionType,
                    isRequired: form.isRequired,
                }}
            >
                <Flex vertical gap={32}>
                    <Flex gap="large" align="end">
                        <Form.Item<CreateIssueFormRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            label="Тип формы сдачи"
                            name="formSolutionType"
                        >
                            <Select
                                options={[
                                    { value: 0, label: 'Не выбран' },
                                    { value: 1, label: 'Текст' },
                                    { value: 2, label: 'Файл' },
                                    { value: 3, label: 'Текст или файлы' },
                                ]}
                                onChange={value => {
                                    handleChangeIssueForm(form.id, 'formSolutionType', value);
                                }}
                            />
                        </Form.Item>

                        <Form.Item<CreateIssueFormRequest>
                            className={getModuleClasses(styles, 'formItem')}
                            layout="horizontal"
                            name="isRequired"
                            valuePropName="checked"
                        >
                            <Checkbox>Обязательное поле</Checkbox>
                        </Form.Item>
                    </Flex>

                    <Form.Item<CreateIssueFormRequest>
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
                                handleChangeIssueForm(form.id, 'name', event.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item<CreateIssueFormRequest>
                        className={getModuleClasses(styles, 'formItem')}
                        label="Описание"
                        name="description"
                        rules={[
                            { max: 2047, message: 'Не больше 2047 символов' },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Введите текст..."
                            maxLength={2047}
                            showCount
                        />
                    </Form.Item>
                </Flex>
            </Form>
        );
    };

    const formsToItems = (forms: GetIssueFormDraftResponse[]) => {
        return forms.map((form, index) => ({
            key: `form${form.id}`,
            children: getIssueFormForm(form),
            extra: getIssueFormButtons(index),
            label: (
                <Typography.Title level={5} style={{ margin: 0 }}>
                    Форма сдачи {index + 1} {form.id}
                </Typography.Title>
            ),
        }));
    };

    return (
        <Flex vertical gap="large">
            {
                forms.length > 0 &&
                <Collapse defaultActiveKey={['1']} items={formsToItems(forms)} />
            }
            <Button icon={<PlusCircleOutlined />} type="primary" onClick={handleAddNewIssueForm}>
                Добавить критерий
            </Button>
        </Flex>
    );
});
