import { Flex, Form, Input, UploadFile } from 'antd';
import { ReactNode, useCallback, useState } from 'react';

import { getFormItemUploadNotFileValue, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { FileInput, ImagePreview } from '@shared/ui';

import styles from './SpaceForm.module.css';
import { Space } from '../../model/Space';

type SpaceSettingsWithFile = Space & {fileList?: UploadFile[]; defaultFileList?: UploadFile[]};

export type Props<TData extends Space> = ClassNameProps & TestProps & Readonly<{
    submit: (data: TData, file: File | null) => void;
    additionalFormItems?: ReactNode;
    submitButton: ReactNode;
    initialValues?: TData & SpaceSettingsWithFile;
}>;

export const SpaceForm = typedMemo(function SpaceForm<TData extends Space>({
    submitButton,
    submit,
    initialValues,
    additionalFormItems,
}: Props<TData>) {
    const [file, setFile] = useState<File | null>(null);

    const onSubmit = useCallback((form: TData) => {
        submit(form, file);
    }, [file, submit]);

    return (
        <Form
            className={styles.form}
            name="SpaceForm"
            layout="vertical"
            onFinish={onSubmit}
            requiredMark={false}
            initialValues={initialValues}
        >
            <Flex gap={20}>
                <Form.Item<SpaceSettingsWithFile>
                    className={styles.formItem}
                    getValueFromEvent={getFormItemUploadNotFileValue}
                    name="fileList"
                    valuePropName="fileList"
                >
                    <FileInput
                        defaultFileList={initialValues?.defaultFileList}
                        isEmpty={file === null}
                        multiple={false}
                        maxCount={1}
                        showUploadList={false}
                        filledComponent={<ImagePreview file={file} />}
                        listType="picture-card"
                        emptyText="Иконка"
                        onChangeFile={setFile}
                    />
                </Form.Item>
                <Form.Item<SpaceSettingsWithFile>
                    className={styles.name}
                    label="Название"
                    name="name"
                    rules={[
                        { required: true, message: 'Введите название' },
                    ]}
                >
                    <Input
                        showCount
                        placeholder="Введите название..."
                        maxLength={64}
                    />
                </Form.Item>
            </Flex>
            <Form.Item<SpaceSettingsWithFile>
                label="Описание"
                className={styles.formItem}
                name="description"
                rules={[
                    { required: true, message: 'Введите описание' },
                ]}
            >
                <Input.TextArea
                    maxLength={256}
                    showCount
                    rows={3}
                    placeholder="Введите описание..."
                />
            </Form.Item>
            {additionalFormItems}
            {submitButton}
        </Form>
    );
});
