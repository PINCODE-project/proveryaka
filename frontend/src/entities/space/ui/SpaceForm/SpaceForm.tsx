import { Flex, Form, Input } from 'antd';
import { ReactNode, useState } from 'react';

import { CreateSpaceRequest } from '@features/space/create-space/model/CreateSpaceRequest';

import { typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput } from '@shared/ui';

import styles from './SpaceForm.module.css';
import { SpaceSettings } from '../../model/SpaceSettings';

export type Props<TData extends SpaceSettings> = ClassNameProps & TestProps & Readonly<{
    submit: (data: TData) => void;
    additionalFormItems?: ReactNode;
    submitButton: ReactNode;
    initialValues?: TData;
}>;

export const SpaceForm = typedMemo(function SpaceForm<TData extends SpaceSettings>({
    submitButton,
    submit,
    initialValues,
    additionalFormItems,
}: Props<TData>) {
    const [file, setFile] = useState<File | null>(null);

    return (
        <Form
            className={styles.form}
            name="SignInForm"
            layout="vertical"
            onFinish={submit}
            requiredMark={false}
            initialValues={initialValues}
        >
            <Flex gap={20}>
                <Form.Item<CreateSpaceRequest> valuePropName="fileList" name="icon" className={styles.formItem}>
                    <FileInput
                        isEmpty={file === null}
                        filledComponent={<img src={file ? URL.createObjectURL(file) : ''} />}
                        emptyText="Иконка"
                        onChangeFile={setFile}
                        showUploadList={false}
                    />
                </Form.Item>
                <Form.Item<CreateSpaceRequest>
                    className={styles.formItem}
                    label="Название"
                    name="name"
                    rules={[
                        { required: true, message: 'Введите название' },
                    ]}
                >
                    <Input placeholder="Введите название..." />
                </Form.Item>
            </Flex>
            <Form.Item<CreateSpaceRequest>
                label="Описание"
                className={styles.formItem}
                name="description"
                rules={[
                    { required: true, message: 'Введите описание' },
                ]}
            >
                <Input.TextArea rows={3} placeholder="Введите описание..." />
            </Form.Item>
            {additionalFormItems}
            {submitButton}
        </Form>
    );
});
