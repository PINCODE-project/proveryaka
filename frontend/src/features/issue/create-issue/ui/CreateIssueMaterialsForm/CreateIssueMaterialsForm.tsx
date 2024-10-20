import { DeleteOutlined, DownOutlined, PlusCircleOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, FormInstance, Input, Select, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { typedMemo, useGetEstimateFile } from '@shared/lib';
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

export const CreateIssueMaterialsForm: FC<Props> = typedMemo(function CreateIssueMaterialsForm({
    form,
    materials,
    setMaterials,
}) {
    console.log('materials', materials);
    const handleAddNewMaterial = useCallback(() => {
        setMaterials([...materials,
            {
                id: uuid(),
                name: '',
                description: '',
                type: 0,
                fileId: null,
                text: '',
                file: null,
            },
        ] as CreateIssueMaterialDraftRequest[]);
    }, [materials, setMaterials]);

    const handleMoveMaterial = (move: (from: number, to: number) => void, oldIndex: number, newIndex: number) => {
        move(oldIndex, newIndex);
    };

    const handleChangeMaterial = (id: string, field: string, value: any) => {
        setMaterials(materials.map(
            material => material.id === id
                ? { ...materials.find(material => material.id === id), [field]: value }
                : material,
        ) as CreateIssueMaterialDraftRequest[]);
    };

    const getMaterialButtons = (
        remove: (index: number) => void,
        move: (from: number, to: number) => void,
        index: number,
        length: number,
    ) => {
        return (
            <div>
                {index !== length - 1 && (
                    <Button
                        icon={<DownOutlined />}
                        type="text"
                        onClick={() => handleMoveMaterial(move, index, index + 1)}
                    />
                )}
                {index !== 0 && (
                    <Button
                        icon={<UpOutlined />}
                        type="text"
                        onClick={() => handleMoveMaterial(move, index, index - 1)}
                    />
                )}
                <Button
                    icon={<DeleteOutlined style={{ color: '#FF4D4F' }} />}
                    type="text"
                    onClick={() => remove(index)}
                />
            </div>
        );
    };

    const MaterialForm: FC<{index: number; restField: any}> = ({ index, restField }) => {
        console.log('material', materials[index], index);
        const material = materials[index];

        useGetEstimateFile(
            material.fileId!,
            {
                enabled: !!material.fileId && material.file === null,
                onSuccess: value => {
                    handleChangeMaterial(material.id, 'file', value);
                },
                refetchOnWindowFocus: false,
                refetchOnMount: false,
            },
        );

        return (
            <Flex vertical gap={28} className={getModuleClasses(styles, 'form')}>
                <Flex gap="large">
                    <Form.Item
                        {...restField}
                        className={getModuleClasses(styles, 'formItem')}
                        name={[index, 'type']}
                        label="Тип материала"
                        rules={[{ required: true, message: 'Выберите тип материала' }, {
                            validator: (_, value: number) => {
                                if (value >= 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Выберите тип материала'));
                            },
                        }]}
                    >
                        <Select
                            options={[
                                { value: -1, label: 'Не выбран' },
                                { value: 0, label: 'Текст' },
                                { value: 1, label: 'Ссылка' },
                                { value: 2, label: 'Файл' },
                            ]}
                            onChange={value => handleChangeMaterial(material.id, 'type', value)}
                        />
                    </Form.Item>
                    {
                        materials[index].type === 1 &&
                        <Form.Item<CreateIssueMaterialDraftRequest>
                            {...restField}
                            className={getModuleClasses(styles, 'formItem')}
                            name={[index, 'text']}
                            label="Ссылка"
                            rules={[
                                { required: true, message: 'Вставьте ссылку' },
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
                            // filledComponent={(
                            //     <Flex gap={10}>
                            //         {material.file === null ? 'Файл с сервера' : material.file.name}
                            //         <CloseOutlined
                            //             onClick={() => {
                            //                 handleChangeMaterial(material.id, 'file', null);
                            //                 handleChangeMaterial(material.id, 'fileId', null);
                            //             }}
                            //         />
                            //     </Flex>
                            // )}
                            listType="text"
                            emptyText="Загрузить файл"
                            onChangeFile={value => handleChangeMaterial(material.id, 'file', value)}
                            isButton={true}
                        />
                    }
                </Flex>
                {
                    material.type === 0 &&
                    <Form.Item<CreateIssueMaterialDraftRequest>
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
                            onChange={value => handleChangeMaterial(material.id, 'text', value)}
                        />

                    </Form.Item>
                }
                <Form.Item<CreateIssueMaterialDraftRequest>
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    label="Название"
                    name={[index, 'name']}
                    rules={[
                        { required: true, message: 'Введите название' },
                        { max: 64, message: 'Не больше 64 символов' },
                    ]}
                >
                    <Input
                        placeholder="Введите название..."
                        showCount
                        maxLength={64}
                        onChange={value => handleChangeMaterial(material.id, 'name', value.target.value)}
                    />
                </Form.Item>

                <Form.Item<CreateIssueMaterialDraftRequest>
                    {...restField}
                    className={getModuleClasses(styles, 'formItem')}
                    label="Описание"
                    name={[index, 'description']}
                    rules={[
                        { max: 256, message: 'Не больше 256 символов' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Введите текст..."
                        maxLength={256}
                        showCount
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
            <Flex vertical gap={32}>
                <Form.List name="materials">
                    {(fields, { add, remove, move }) => (
                        <Collapse
                            items={fields.map(({ key, name, ...restField }, index) => {
                                return (
                                    {
                                        key: `material${key}`,
                                        label: <Typography.Title level={5} style={{ margin: 0 }}>
                                            Материал {index + 1}
                                        </Typography.Title>,
                                        extra: getMaterialButtons(remove, move, index, fields.length),
                                        children: <MaterialForm index={name} restField={restField} />,
                                    }
                                );
                            })}
                        />
                    )}
                </Form.List>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{ width: '200px' }}
                    onClick={handleAddNewMaterial}
                >
                    Добавить материал
                </Button>
            </Flex>
        </Form>
    );
});
