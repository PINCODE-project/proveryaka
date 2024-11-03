import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, FormInstance, FormListOperation, Input, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { MaterialButtons } from '@features/issue/create-issue/ui/CreateIssueMaterialsForm/MaterialsButtons';

import { typedMemo } from '@shared/lib';
import { getModuleClasses } from '@shared/lib/getModuleClasses';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput } from '@shared/ui';

import styles from './CreateIssueMaterialsForm.module.css';
import { CreateIssueMaterialDraftRequest } from '../../model/CreateIssueMaterialDraftRequest';

export type Props = ClassNameProps & TestProps & Readonly<{
    form: FormInstance;
    materials: CreateIssueMaterialDraftRequest[];
    setMaterials: Dispatch<SetStateAction<CreateIssueMaterialDraftRequest[]>>;
}>;

const linkExpression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;

export const CreateIssueMaterialsForm: FC<Props> = typedMemo(function CreateIssueMaterialsForm({
    form,
    materials,
    setMaterials,
}) {
    const handleAddNewMaterial = useCallback(
        (add: FormListOperation['add']) => {
            const initMaterial = {
                id: uuid(),
                name: '',
                description: '',
                type: 0,
                fileId: null,
                text: '',
                file: null,
            };
            add(initMaterial);
            setMaterials([...materials, initMaterial] as CreateIssueMaterialDraftRequest[]);
        },
        [materials, setMaterials],
    );

    const handleChangeMaterial = useCallback(
        (id: string, field: string, value: any) => {
            setMaterials(prevMaterials => prevMaterials.map(
                material => material.id === id
                    ? { ...material, [field]: value }
                    : material,
            ));
        },
        [setMaterials],
    );

    const getMaterialForm = (index: number, restField: {fieldKey?: number | undefined}) => {
        const material = { ...materials[index] };

        return (
            <Flex vertical gap={28} className={getModuleClasses(styles, 'form')}>
                <Flex gap="large">
                    <Form.Item
                        {...restField}
                        className={getModuleClasses(styles, 'formItem')}
                        name={[index, 'type']}
                        label="Тип материала"
                        rules={[{ required: true, message: 'Выберите тип материала' }]}
                    >
                        <Select
                            options={[
                                { value: 0, label: 'Текст' },
                                { value: 1, label: 'Ссылка' },
                                { value: 2, label: 'Файл' },
                            ]}
                            onChange={value => handleChangeMaterial(material.id, 'type', value)}
                        />
                    </Form.Item>
                    {
                        materials[index].type === 1 &&
                        <Form.Item
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[index, 'text']}
                            label="Ссылка"
                            rules={[
                                { required: true, message: 'Вставьте ссылку' },
                                {
                                    validator: (_, value) => {
                                        const regex = new RegExp(linkExpression);
                                        if (!value || value.match(regex)) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject(new Error('Неверный формат ссылки'));
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder="Вставьте ссылку"
                                onChange={value => handleChangeMaterial(material.id, 'text', value.target.value)}
                            />
                        </Form.Item>
                    }
                    {
                        material.type === 2 &&
                        <Form.Item
                            {...restField}
                            style={{ marginTop: material.file === null && material.fileId === null ? '30px' : '25px' }}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[index, 'fileId']}
                            rules={[
                                {
                                    validator: () => {
                                        if (material.fileId || material.file) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Загрузите файл'));
                                    },
                                },
                            ]}
                        >
                            <FileInput
                                isEmpty={material.file === null && material.fileId === null}
                                multiple={false}
                                maxCount={1}
                                defaultFileList={material.file
                                    ? [{
                                        uid: material.file.uid,
                                        name: material.file.name,
                                        status: 'done',
                                    }]
                                    : (
                                        material.fileId
                                            ? [{
                                                uid: 'materialFile',
                                                name: 'Файл с сервера',
                                                status: 'done',
                                            }]
                                            : undefined
                                    )
                                }
                                listType="text"
                                emptyText="Загрузить файл"
                                onChange={value => {
                                    handleChangeMaterial(
                                        material.id,
                                        'file',
                                        value.file.status !== 'removed' ? value.file.originFileObj : null,
                                    );
                                    if (!value.fileList.length) {
                                        handleChangeMaterial(material.id, 'fileId', null);
                                    }
                                }}
                                onRemove={() => {
                                    handleChangeMaterial(material.id, 'file', null);
                                    handleChangeMaterial(material.id, 'fileId', null);
                                }}
                                isButton={true}
                            />
                        </Form.Item>
                    }
                </Flex>
                {
                    material.type === 0 &&
                    <Form.Item
                        {...restField}
                        className={getModuleClasses(styles, 'formItem')}
                        label="Текст материала"
                        name={[index, 'text']}
                        rules={[
                            { required: true, message: 'Введите текст' },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Введите текст..."
                            style={{ resize: 'vertical' }}
                            onChange={e => handleChangeMaterial(material.id, 'text', e.target.value)}
                        />
                    </Form.Item>
                }
                <Form.Item
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    label="Название"
                    name={[index, 'name']}
                    rules={[
                        { required: true, message: 'Введите название' },
                        { max: 256, message: 'Не больше 256 символов' },
                    ]}
                >
                    <Input
                        placeholder="Введите название..."
                        showCount
                        maxLength={256}
                        onChange={value => handleChangeMaterial(material.id, 'name', value.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    label="Описание"
                    name={[index, 'description']}
                >
                    <Input.TextArea
                        placeholder="Введите текст..."
                        style={{ resize: 'vertical' }}
                        onChange={value => handleChangeMaterial(material.id, 'description', value.target.value)}
                    />
                </Form.Item>
            </Flex>
        );
    };

    return (
        <Form
            form={form}
            name="materials_form"
            layout="vertical"
            requiredMark={false}
            initialValues={{ materials }}
        >
            <Form.List name="materials">
                {(fields, { add, remove, move }) => (
                    <Flex vertical gap={32}>
                        {
                            fields.length
                                ? <Collapse
                                    items={fields.map(({ key, name, ...restField }, index) => {
                                        return (
                                            {
                                                key: `material${key}`,
                                                id: `material${key}`,
                                                label: (
                                                    <Typography.Title level={5} style={{ margin: 0 }}>
                                                        Материал {index + 1}
                                                    </Typography.Title>
                                                ),
                                                classNames: { header: styles.collapseHeader },
                                                extra: (
                                                    <MaterialButtons
                                                        remove={remove}
                                                        move={move}
                                                        index={index}
                                                        length={fields.length}
                                                        materials={materials}
                                                        setMaterials={setMaterials}
                                                    />
                                                ),
                                                children: getMaterialForm(name, restField),
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
                            onClick={() => handleAddNewMaterial(add)}
                        >
                            Добавить материал
                        </Button>
                    </Flex>
                )}
            </Form.List>
        </Form>
    );
});
