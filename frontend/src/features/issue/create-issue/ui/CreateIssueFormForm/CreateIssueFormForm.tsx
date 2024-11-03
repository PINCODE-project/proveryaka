import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Flex, Form, FormInstance, Input, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { CreateIssueFormButtons } from '@features/issue/create-issue/ui/CreateIssueFormForm/FormButtons';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';

import styles from './CreateIssueFormForm.module.css';
import { CreateIssueFormRequest } from '../../model/CreateIssueFormRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    form: FormInstance;
    forms: CreateIssueFormRequest[];
    setForms: Dispatch<SetStateAction<CreateIssueFormRequest[]>>;
}>;

export const CreateIssueFormForm: FC<Props> = typedMemo(function CreateIssueFormForm({
    form,
    forms,
    setForms,
}) {
    const handleAddNewIssueForm = useCallback((add: any) => {
        const initForm = {
            id: uuid(),
            name: '',
            isRequired: false,
            formSolutionType: 1,
            description: '',
        };
        add(initForm);
        setForms([...forms, initForm]);
    }, [forms, setForms]);

    const handleChangeIssueForm = useCallback(
        (id: string, field: string, value: any) => {
            setForms(prevForm => prevForm.map(
                form => form.id === id
                    ? { ...form, [field]: value }
                    : form,
            ));
        },
        [setForms],
    );

    const getIssueFormForm = (
        index: number,
        restField: {fieldKey?: number | undefined},
    ) => {
        const form = { ...forms[index] };

        return (
            <Flex vertical gap={32}>
                <Flex gap="large" align="end">
                    <Form.Item
                        {...restField}
                        className={getModuleClasses(styles, 'formItem')}
                        label="Тип формы сдачи"
                        name={[index, 'formSolutionType']}
                    >
                        <Select
                            options={[
                                { value: 1, label: 'Текст' },
                                { value: 2, label: 'Файл' },
                                { value: 3, label: 'Текст и/или файл' },
                            ]}
                            onChange={value => {
                                handleChangeIssueForm(form.id!, 'formSolutionType', value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        {...restField}
                        className={getModuleClasses(styles, 'formItem')}
                        layout="horizontal"
                        name={[index, 'isRequired']}
                        valuePropName="checked"
                    >
                        <Checkbox
                            onChange={e => {
                                handleChangeIssueForm(form.id!, 'isRequired', e.target.checked);
                            }}
                        >Обязательное поле</Checkbox>
                    </Form.Item>
                </Flex>

                <Form.Item
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    style={{ maxWidth: 580, width: '100%' }}
                    label="Название"
                    name={[index, 'name']}
                    rules={[
                        { required: true, message: 'Введите название' },
                    ]}
                >
                    <Input
                        placeholder="Введите название..."
                        onChange={event => {
                            handleChangeIssueForm(form.id!, 'name', event.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    style={{ maxWidth: 580, width: '100%' }}
                    label="Описание"
                    name={[index, 'description']}
                >
                    <Input.TextArea
                        style={{ resize: 'vertical' }}
                        placeholder="Введите текст..."
                        onChange={event => {
                            handleChangeIssueForm(form.id!, 'description', event.target.value);
                        }}
                    />
                </Form.Item>
            </Flex>
        );
    };

    return (
        <Form
            form={form}
            name="issue_form_form"
            layout="vertical"
            requiredMark={false}
            initialValues={{ forms }}
        >
            <Form.List name="forms">
                {(fields, { add, remove, move }) => (
                    <Flex vertical gap={32}>
                        {
                            fields.length
                                ? <Collapse
                                    items={fields.map(({ key, name, ...restField }, index) => {
                                        return (
                                            {
                                                key: `form${key}`,
                                                label: (
                                                    <Typography.Title level={5} style={{ margin: 0 }}>
                                                        Форма сдачи {index + 1}
                                                    </Typography.Title>
                                                ),
                                                classNames: { header: styles.collapseHeader },
                                                extra: (
                                                    <CreateIssueFormButtons
                                                        forms={forms}
                                                        setForms={setForms}
                                                        remove={remove}
                                                        move={move}
                                                        index={index}
                                                        length={fields.length}
                                                    />
                                                ),
                                                children: getIssueFormForm(name, restField),
                                                forceRender: true,
                                            }
                                        );
                                    })}
                                />
                                : null
                        }

                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            style={{ width: '200px' }}
                            onClick={() => handleAddNewIssueForm(add)}
                        >
                            Добавить форму сдачи
                        </Button>
                    </Flex>
                )}
            </Form.List>
        </Form>
    )
    ;
});
